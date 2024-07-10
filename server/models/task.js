const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: String,
    description: String,
    done: Boolean,
    userEmail: String
})

const Task = mongoose.model('Task', taskSchema);

module.exports = { Task };
