const express = require('express');
const router = express.Router();
const Reminder = require('../models/Reminder');

router.post('/', async (req, res) => {
  try {
    const newReminder = await Reminder.create(req.body);
    res.status(201).json(newReminder);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/task/:taskId', async (req, res) => {
  try {
    const reminders = await Reminder.find({ taskID: req.params.taskId });
    res.status(200).json(reminders);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updated = await Reminder.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Reminder.findByIdAndDelete(req.params.id);
    res.status(200).json("Deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;