const express = require('express');

const taskController = require('../controllers/task');

const taskRouter = express.Router();

taskRouter.post('/tasks', taskController.create);

module.exports = taskRouter;
