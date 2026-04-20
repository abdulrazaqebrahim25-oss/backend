const mongoose = require('mongoose')
const User = require('../models/User')
const Category =require('../models/Category')
const Reminder = require('../models/Reminder')

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
        enum: ['very-low','low', 'medium', 'high','urgent'],
        default: 'medium'
    },  

    username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }, 

    category: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        default: null
    }
    
},{timestamps: true})

const Task = mongoose.model('Task',taskSchema)

module.exports = Task 

