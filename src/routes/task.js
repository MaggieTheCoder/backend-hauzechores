const express = require('express');

const taskController = require('../controllers/task');

const taskRouter = express.Router();

taskRouter.post('/tasks', taskController.create);
taskRouter.get('/tasks', taskController.getAll);
taskRouter.get('/tasks/userid/:userid', taskController.getTaskByUserId);
taskRouter.patch('/tasks/:id', taskController.updateTaskById);
taskRouter.delete('/tasks/:id', taskController.deleteById);
taskRouter.get('/query/tasks/', taskController.getByQuery);

module.exports = taskRouter;
