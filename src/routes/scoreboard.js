const express = require('express');

const scoreboardController = require('../controllers/scoreboard');

const router = express.Router();

router.post('/scoreboard', scoreboardController.create);
router.get('/scoreboard', scoreboardController.getAllScores);
router.patch('/scoreboard/:id', scoreboardController.updateScore);

module.exports = router;