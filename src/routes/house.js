const express = require('express');

const houseController = require('../controllers/house');



const router = express.Router();

router.post('/houses', houseController.create);
router.get('/houses', houseController.getAll);
router.get('/houses/:houseID', houseController.getById);
router.get('/houses/invitecode/:invitecode', houseController.getByInvitecode);
router.patch('/houses/:houseID', houseController.updateHouse);
router.delete('/houses/:houseID', houseController.deleteHouse);

module.exports = router;