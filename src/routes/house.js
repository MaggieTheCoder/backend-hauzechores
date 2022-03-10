const express = require('express');

const houseController = require('../controllers/house');



const router = express.Router();

router.post('/houses', houseController.create);

module.exports = router;
