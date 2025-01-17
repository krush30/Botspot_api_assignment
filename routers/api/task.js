const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Task = require('../../model/Task');

// Create task
router.post(
    '/',
    [
        auth,
        check('title', 'Title is required').not().isEmpty(),
        check('description', 'Description is required').not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await User.findById(req.user.id).select('-password')
            const newTask = new Task({
                title: req.body.title,
                name: user.name,
                description: req.body.description,
                user: req.user.id
            })

            const post = await newTask.save();
            res.json(post)

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

// Get all tasks
router.get('/', auth, async (req, res) => {
    try {
        const tasks = await Task.find().sort({
            date: -1
        })
        res.json(tasks)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
})

// Get task by id
router.get('/:id', auth, async (req, res) => {
    try {
        const tasks = await Task.findById(req.params.id)
        if (!tasks) {
            return res.status(404).json({ msg: 'Task not found' })
        }
        res.json(tasks)
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Task not found' })
        }
        res.status(500).send('Server error')
    }
})

// Delete tasks 
router.delete('/:id', auth, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        if (!task) {
            return res.status(404).json({ msg: 'Task not found' })
        }
        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "User not authorized" })
        } else {
            await Task.deleteOne({ _id: req.params.id })
        }
        res.json({ msg: "Task has been deleted" })


    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' })
        }
        res.status(500).send('Server error')
    }
})


//Update a task
router.put('/:id', auth, async (req, res) => {
    const { title, description, status } = req.body;

    const updatedFields = {};
    if (title) updatedFields.title = title;
    if (description) updatedFields.description = description;
    if (status) updatedFields.status = status;

    try {
        let task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }

        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        task = await Task.findByIdAndUpdate(
            req.params.id,
            { $set: updatedFields },
            { new: true }
        );

        res.json(task);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Task not found' });
        }
        res.status(500).send('Server error');
    }
});

// Search a task by title 
router.get('/search/:title', auth, async (req, res) => {
    try {
        const title = req.params.title;
        const tasks = await Task.find({ title: { $regex: title, $options: 'i' } });

        if (!tasks || tasks.length === 0) {
            return res.status(404).json({ msg: 'No tasks found with the given title' });
        }

        res.json(tasks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});



module.exports = router;
