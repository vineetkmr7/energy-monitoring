var express = require('express');
var router = express.Router();
const { EnergyController } = require('../app/controllers');
const { authMiddleware } = require('../app/middlewares');

/* GET users listing. */
router.get('/', authMiddleware, EnergyController.getTotalPowerConsumed);
router.get('/stats', authMiddleware, EnergyController.getStats)

module.exports = router;
