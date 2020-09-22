const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { DeviceStatusEnum } = require('../constants/enums');

const DeviceSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    powerConsumed: {
        type: Number,
        default: 0,
        min: 0
    },
    status: {
        type: String,
        trim: true,
        enum: DeviceStatusEnum,
        default: 'OFFLINE',
    }
})

module.exports = mongoose.model('Device', DeviceSchema);