const BaseDTO = require('../dtos/base.dto');
const Constants = require('../constants/constants');
const { DeviceService } = require('../services');
const { DeviceStatusEnum } = require('../constants/enums');

class DeviceController {

    static async addDevice(req, res, next) {
        const body = req.body;

        let baseResponse = new BaseDTO();
        try {
            const device = {};
            if (!body.name) {
                baseResponse.code = 400;
                throw new Error(Constants.NAME_REQUIRED);
            } else {
                device.name = body.name;
            }
            if (body.status) {
                if (!DeviceStatusEnum.includes(String(body.status).trim())) {
                    baseResponse.code = 400;
                    throw new Error(Constants.INVALID_DEVICE_STATUS);
                } else {
                    device.status = body.status;
                }
            }
            if (body.powerConsumed) {
                if (Number(body.powerConsumed) && body.powerConsumed >= 0) {
                    device.powerConsumed = body.powerConsumed;
                } else {
                    baseResponse.code = 400;
                    throw new Error(Constants.INVALID_DEVICE_POWER);
                }
            }

            const result = await DeviceService.addDevice(device);
            baseResponse.setResponseData(true, Constants.DEVICE_ADDED, result, 201);

        } catch (err) {
            baseResponse.setResponseData(false, err.message, err);
        } finally {
            res.status(baseResponse.code).json(baseResponse);
        }
    }


    static async getAllDevices(req, res, next) {
        let baseResponse = new BaseDTO();
        try {
            const result = await DeviceService.getAllDevices();
            baseResponse.setResponseData(true, Constants.DEVICES_FETCHED, result, 200);
        } catch (err) {
            baseResponse.setResponseData(false, err.message, err);
        } finally {
            res.status(baseResponse.code).json(baseResponse);
        }
    }

    static async getDevice(req, res, next) {
        const id = req.params.id;
        let baseResponse = new BaseDTO();
        try {
            const result = await DeviceService.getDevice(id);
            baseResponse.setResponseData(true, Constants.DEVICES_FETCHED, result, 200);
        } catch (err) {
            baseResponse.setResponseData(false, err.message, err);
        } finally {
            res.status(baseResponse.code).json(baseResponse);
        }
    }

    static async resetDevice(req, res, next) {
        const id = req.params.id;
        let baseResponse = new BaseDTO();
        try {
            const device = {
                status: 'OFFLINE',
                powerConsumed: 0
            }
            const result = await DeviceService.updateDevice(id, device);
            baseResponse.setResponseData(true, Constants.DEVICE_RESET_DONE, result, 200);
        } catch (err) {
            baseResponse.setResponseData(false, err.message, err);
        } finally {
            res.status(baseResponse.code).json(baseResponse);
        }
    }

    static async resetAllDevices(req, res, next) {
        let baseResponse = new BaseDTO();
        try {
            const device = {
                status: 'OFFLINE',
                powerConsumed: 0
            }
            const result = await DeviceService.updateDevices(device);
            baseResponse.setResponseData(true, Constants.DEVICE_RESET_DONE, result, 200);
        } catch (err) {
            baseResponse.setResponseData(false, err.message, err);
        } finally {
            res.status(baseResponse.code).json(baseResponse);
        }
    }

    static async deleteAllDevices(req, res, next) {
        let baseResponse = new BaseDTO();
        try {
            const result = await DeviceService.deleteAllDevices();
            baseResponse.setResponseData(true, Constants.DEVICES_DELETED, result, 200);
        } catch (err) {
            baseResponse.setResponseData(false, err.message, err);
        } finally {
            res.status(baseResponse.code).json(baseResponse);
        }
    }

    static async deleteDevice(req, res, next) {
        const id = req.params.id;
        let baseResponse = new BaseDTO();
        try {
            const result = await DeviceService.deleteDevice(id);
            baseResponse.setResponseData(true, Constants.DEVICES_DELETED, result, 200);
        } catch (err) {
            baseResponse.setResponseData(false, err.message, err);
        } finally {
            res.status(baseResponse.code).json(baseResponse);
        }
    }

    static async updateDevice(req, res, next) {
        const id = req.params.id;
        const body = req.body;
        let baseResponse = new BaseDTO();
        try {
            const device = {};
            if (!body.name) {
                baseResponse.code = 400;
                throw new Error(Constants.NAME_REQUIRED);
            }else{
                device.name = body.name;
            }
            if (body.status) {
                if (!DeviceStatusEnum.includes(String(body.status).trim())) {
                    baseResponse.code = 400;
                    throw new Error(Constants.INVALID_DEVICE_STATUS);
                } else {
                    device.status = body.status;
                }
            }
            if (body.powerConsumed) {
                if (Number(body.powerConsumed) && body.powerConsumed >= 0) {
                    device.powerConsumed = body.powerConsumed;
                } else {
                    baseResponse.code = 400;
                    throw new Error(Constants.INVALID_DEVICE_POWER);
                }
            }
            const result = await DeviceService.updateDevice(id, device);
            baseResponse.setResponseData(true, Constants.DEVICE_UPDATED, result, 200);
        } catch (err) {
            baseResponse.setResponseData(false, err.message, err);
        } finally {
            res.status(baseResponse.code).json(baseResponse);
        }
    }

    static async consumePower(req, res, next) {
        const id = req.params.id;
        const body = req.body;
        let baseResponse = new BaseDTO();
        try {
            if (!body.powerConsumed) {
                baseResponse.code = 400;
                throw new Error(Constants.DEVICE_POWER_REQUIRED);
            }
            if (Number(body.powerConsumed) && body.powerConsumed < 0) {
                baseResponse.code = 400;
                throw new Error(Constants.INVALID_DEVICE_POWER);
            }
            const device = {
                powerConsumed: Number(body.powerConsumed),
                status: 'ONLINE'
            };
            const result = await DeviceService.addDevicePowerConsumption(id, device);
            baseResponse.setResponseData(true, Constants.DEVICE_POWER_CONSUMED, result, 200);
        } catch (err) {
            baseResponse.setResponseData(false, err.message, err);
        } finally {
            res.status(baseResponse.code).json(baseResponse);
        }
    }

}

module.exports = DeviceController;