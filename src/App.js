const express = require('express');
const userRouter = require('./routes/user');
const app = express();

app.use(express.json());

app.post('/users', userRouter);

app.get('/test', (req, res) => {
  res.status(200).send('Hello World');
});

module.exports = app;
