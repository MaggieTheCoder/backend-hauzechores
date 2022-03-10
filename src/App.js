const express = require('express');
const app = express();
const userRouter = require('./routes/user');
const taskRouter = require('./routes/task');
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use(userRouter);

app.use(taskRouter);

app.get('/test', (req, res) => {
  res.status(200).send('Hello World');
});

module.exports = app;
