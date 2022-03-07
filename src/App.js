const express = require('express');
const userRouter = require('./routes/user');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.post('/users', userRouter);

app.get('/test', (req, res) => {
  res.status(200).send('Hello World');
});

module.exports = app;
