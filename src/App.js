const express = require('express');
const app = express();
const userRouter = require('./routes/user');
const taskRouter = require('./routes/task');
const houseRouter = require('./routes/house');
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use(userRouter);

app.post('/users', userRouter);
app.post('/houses', houseRouter)
app.use(taskRouter);

app.get('/test', (req, res) => {
  res.status(200).send('Hello World');
});

module.exports = app;
