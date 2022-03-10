const express = require('express');

const taskController = require('../controllers/task');

const taskRouter = express.Router();

taskRouter.post('/tasks', taskController.create);
taskRouter.get('/tasks', taskController.getAll);

module.exports = taskRouter;
