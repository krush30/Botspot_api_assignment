require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');


connectDB()
const app = express();

app.use(express.json({ extended: false }));


app.use('/api/user', require('./routers/api/user'))
app.use('/api/task', require('./routers/api/task'))



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App Started at ${PORT}`));
