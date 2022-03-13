const express = require('express');
const userController = require('../controllers/user');

const userRouter = express.Router();

userRouter.post('/users', userController.create);
userRouter.get('/users', userController.getAll);
userRouter.get('/users/:id', userController.getById);
userRouter.patch('/users/:id', userController.updateUserById);
userRouter.delete('/users/:id', userController.deleteById);
userRouter.get('/query/users/', userController.getByQuery);
userRouter.patch('/email/', userController.updateUserByEmail);

module.exports = userRouter;
