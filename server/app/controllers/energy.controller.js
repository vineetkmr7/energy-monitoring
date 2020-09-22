const BaseDTO = require('../dtos/base.dto');
const { DeviceService } = require('../services');
const Constants = require('../constants/constants');

class EnergyController {
    static async getTotalPowerConsumed(req, res, next) {
        let baseResponse = new BaseDTO();
        try {
            let result = await DeviceService.getTotalPowerConsumption();
            baseResponse.setResponseData(true, Constants.DEVICE_POWER_CONSUMED, result, 200);
        } catch (err) {
            baseResponse.setResponseData(false, err.message, err);
        } finally {
            res.status(baseResponse.code).json(baseResponse);
        }
    }

    static async getStats(req, res, next) {
        let baseResponse = new BaseDTO();
        try {
            const totalPower = await DeviceService.getTotalPowerConsumption();
            const statusCounts = await DeviceService.getDeviceStatusCounts();
            const totalDevices = await DeviceService.getTotalDevices();
            const stats = { ...totalPower, ...statusCounts, ...totalDevices };
            baseResponse.setResponseData(true, Constants.STATS_FETCHED, stats, 200);
        } catch (err) {
            baseResponse.setResponseData(false, err.message, err);
        } finally {
            res.status(baseResponse.code).json(baseResponse);
        }
    }
}

module.exports = EnergyController;