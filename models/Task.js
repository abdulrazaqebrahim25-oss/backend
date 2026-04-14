const mongoose = require('mongoose')
const User = require('../models/User')
const Category =require('../models/Category')

const taskSchema = new mongoose.Schema({
    title: {type: String, 
        required: true
    },
    description: String,
    start: Date,
    end: Date,
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending'
    },
    routine: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'one-time'],
        default: 'one-time'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    }, 
    
    timestamps: true, 

    username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }, 

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }
    
})

const Task = mongoose.model('Task',taskSchema)

module.exports = 'Task' 

