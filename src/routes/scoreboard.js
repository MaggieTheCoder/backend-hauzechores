const express = require('express');

const scoreboardController = require('../controllers/scoreboard');

const router = express.Router();

router.post('/scoreboard', scoreboardController.create);
router.get('/scoreboard', scoreboardController.getAllScores);
router.get('/query/scoreboard/', scoreboardController.getByQuery);
router.patch('/scoreboard/:userid', scoreboardController.updateScore);

module.exports = router;
