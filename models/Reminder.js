const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  remindat: {
    type: Date,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  taskID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    required: true
  }
});

module.exports = mongoose.model('Reminder', reminderSchema);