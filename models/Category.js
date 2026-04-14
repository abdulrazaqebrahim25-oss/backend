const mongoose = require('mongoose');
const User = require('../models/User')

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    }
)

const Category = mongoose.model('Category', categorySchema)
module.exposts = 'Category'