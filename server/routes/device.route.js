var express = require('express');
var router = express.Router();
const { DeviceController } = require('../app/controllers');
const { authMiddleware } = require('../app/middlewares');

/* GET users listing. */
router.post('/', authMiddleware, DeviceController.addDevice);
router.get('/', authMiddleware, DeviceController.getAllDevices);
router.patch('/', authMiddleware, DeviceController.resetAllDevices);
router.delete('/', authMiddleware, DeviceController.deleteAllDevices);
router.get('/:id', authMiddleware, DeviceController.getDevice);
router.delete('/:id', authMiddleware, DeviceController.deleteDevice);
router.put('/:id', authMiddleware, DeviceController.updateDevice);
router.patch('/:id/reset', authMiddleware, DeviceController.resetDevice);
router.patch('/:id/consume', DeviceController.consumePower);

module.exports = router;
