const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
    },
    status: {
        type: String,
        enum: ['concluída', 'pendente'],
        default: 'undefined',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task; 
