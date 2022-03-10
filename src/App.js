const express = require('express');
const app = express();
const userRouter = require('./routes/user');
const taskRouter = require('./routes/task');
const houseRouter = require('./routes/house');
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(taskRouter);
app.use(houseRouter);

app.get('/test', (req, res) => {
  res.status(200).send('Hello World');
});

module.exports = app;
