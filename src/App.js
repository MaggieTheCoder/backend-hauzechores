const express = require('express');
const userRouter = require('./routes/user');
const houseRouter = require('./routes/house');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.post('/users', userRouter);
app.post('/houses', houseRouter)

app.get('/test', (req, res) => {
  res.status(200).send('Hello World');
});

module.exports = app;
