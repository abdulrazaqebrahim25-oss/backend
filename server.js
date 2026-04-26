const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');
const authRouter = require('./controllers/auth.routes');
const verifyToken = require('./middleware/verify-token');
const reminderRouter = require('./controllers/reminder.routes')
const taskRouter = require('./controllers/task.routes')
const categoryRouter = require('./controllers/category.routes')
const aiRoutes = require('./controllers/ai.routes');


mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(cors());
app.use(express.json());
app.use(logger('dev'));

// Routes go here
app.use('/auth', authRouter);
app.use('/reminders', reminderRouter);
app.use('/tasks',taskRouter);
app.use('/category', categoryRouter)
app.use('/ai', aiRoutes);


app.listen(3000, () => {
  console.log('The express app is ready!');
});
