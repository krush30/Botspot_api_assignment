const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
        status: {
            type: String,
            enum: ['Pending', 'In Progress', 'Completed'],
            default: 'Pending',
        },
    },
    {
        timestamps: true,
    }
)

module.exports = Task = mongoose.model('task', TaskSchema)