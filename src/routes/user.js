const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

router.post('/users', userController.create);

module.exports = router;
