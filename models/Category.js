const mongoose = require('mongoose');
const User = require('../models/User')

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    }
)

const Category = mongoose.model('Category', categorySchema)
module.exports = Category
