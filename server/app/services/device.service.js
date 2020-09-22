const { Device } = require('../models');

class DeviceService {

    static async addDevice(deviceData) {
        const device = new Device(deviceData);
        return await device.save();
    }

    static async getDevice(id) {
        return await Device.findById(id);
    }

    static async getAllDevices() {
        return await Device.find({});
    }


    static async updateDevice(id, deviceData) {
        return await Device.findByIdAndUpdate({ _id: id }, deviceData);
    }

    static async updateDevices(deviceData) {
        return await Device.updateMany({}, deviceData);
    }

    static async deleteDevice(id) {
        return await Device.findByIdAndDelete({ _id: id });
    }

    static async deleteAllDevices() {
        return await Device.deleteMany({});
    }

    static async updateDevice(id, newDeviceData) {
        return await Device.findByIdAndUpdate(id, newDeviceData);
    }

    static async addDevicePowerConsumption(id, devicePowerData) {
        const device = await Device.findById({ _id: id });
        device.powerConsumed += devicePowerData.powerConsumed;
        device.status = devicePowerData.status;
        return await device.save();
    }

    static async getTotalPowerConsumption() {
        let result = await Device.aggregate()
            .group({ _id: null, totalPowerConsumed: { $sum: '$powerConsumed' } })
            .project({ _id: 0, totalPowerConsumed: 1 });
        // console.log("power result ", result);
        return result[0];

    }


    static async getDeviceStatusCounts() {
        let stats = await Device.aggregate()
            .group({ _id: '$status', totalDevices: { $sum: 1 } });
        let result = {};
        for (const stat of stats) {
            if (stat._id === 'OFFLINE') {
                result.offlineDevices = stat.totalDevices;
            }
            if (stat._id === 'ONLINE') {
                result.onlineDevices = stat.totalDevices;
            }
        }
        // console.log("device status counts ", result)
        return result;
    }

    static async getTotalDevices() {
        let result = await Device.countDocuments();
        return { totalDevices: result };
    }
}

module.exports = DeviceService