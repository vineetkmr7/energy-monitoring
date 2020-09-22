const assert = require('assert');
const request = require('supertest');
const app = require('../app');
const { User, Device } = require('../app/models');
const expect = require('chai').expect;
const Constants = require('../app/constants/constants');


describe('Device suite', () => {
    const userOne = {
        name: "Vineet Kumar",
        email: "vineetkumar@outlook.in",
        password: "testtest"
    }
    const deviceOne = {
        name: "TV",
    }
    let deviceOneId;
    const deviceTwo = {
        name: "Bulb",
        powerConsumed: 20,
        status: 'ONLINE'
    }
    let deviceTwoId;
    let token;
    before(async () => {
        await User.deleteMany();
        await Device.deleteMany();
        const response = await request(app)
            .post('/users')
            .send(userOne)
            .expect(201);
        token = response.body.response.token;
    })
    after(async () => {
        await request(app)
            .post('/users/logout')
            .set('Authorization', `Bearer ${token}`)
            .send()
            .expect(200);
    })

    it('should add a device', async () => {
        const response = await request(app)
            .post('/devices')
            .set('Authorization', `Bearer ${token}`)
            .send(deviceOne)
            .expect(201);
        // test db if it is added
        const device = Device.findOne({ _id: response.body.response._id })
        expect(device).to.be.not.null;
        deviceOneId = response.body.response._id;
    })

    it('should get all devices', async () => {
        const response = await request(app)
            .get('/devices')
            .set('Authorization', `Bearer ${token}`)
            .send()
            .expect(200);
        // test db if it is added
        expect(response.body.response.length).to.equal(1);
    })


    it('should add another device', async () => {
        const response = await request(app)
            .post('/devices')
            .set('Authorization', `Bearer ${token}`)
            .send(deviceTwo)
            .expect(201);
        // test db if it is added
        const device = Device.findOne({ _id: response.body.response._id })
        expect(device).to.be.not.null;
        deviceTwoId = response.body.response._id;
    })

    it('should get two devices', async () => {
        const response = await request(app)
            .get('/devices')
            .set('Authorization', `Bearer ${token}`)
            .send()
            .expect(200);
        // test db if it is added
        expect(response.body.response.length).to.equal(2);
    })

    it('should get single device by id', async () => {
        const response = await request(app)
            .get(`/devices/${deviceOneId}`)
            .set('Authorization', `Bearer ${token}`)
            .send()
            .expect(200);
        // test db if it is added
        expect(response.body.response.name).to.equal(deviceOne.name);
    })

    it('should update device name', async () => {
        let modified = {
            name: "Refridgerator",
            powerConsumed: 400,
            status: 'ONLINE'
        }
        const response = await request(app)
            .put(`/devices/${deviceOneId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(modified)
            .expect(200);
        // test db if it is modified
        const device = await Device.findOne({ _id: response.body.response._id })
        expect(device.name).to.equal(modified.name);
        expect(device.powerConsumed).to.equal(modified.powerConsumed);
        expect(device.status).to.equal(modified.status);

    })

    it('should update power consumption for device', async () => {
        let modified = {
            powerConsumed: 400,
        }
        const response = await request(app)
            .patch(`/devices/${deviceTwoId}/consume`)
            .set('Authorization', `Bearer ${token}`)
            .send(modified)
            .expect(200);
        // test db if it is modified
        const device = await Device.findOne({ _id: response.body.response._id })
        expect(device.powerConsumed).to.equal(modified.powerConsumed + deviceTwo.powerConsumed);

    })

    it('should reset the device', async () => {
        const response = await request(app)
            .patch(`/devices/${deviceTwoId}/reset`)
            .set('Authorization', `Bearer ${token}`)
            .send()
            .expect(200);
        // test db if it is modified
        const device = await Device.findOne({ _id: response.body.response._id })
        expect(device.powerConsumed).to.equal(0);
        expect(device.status).to.equal('OFFLINE');
    })

    it('should reset all the device', async () => {
        const response = await request(app)
            .patch(`/devices`)
            .set('Authorization', `Bearer ${token}`)
            .send()
            .expect(200);
        // test db if it is modified
        const devices = await Device.find()
        devices.forEach((device) => {
            expect(device.powerConsumed).to.equal(0);
            expect(device.status).to.equal('OFFLINE');
        })
    })
    it('should delete the device', async () => {
        const response = await request(app)
            .delete(`/devices/${deviceTwoId}`)
            .set('Authorization', `Bearer ${token}`)
            .send()
            .expect(200);
        // test db if it is modified
        const device = await Device.findById({ _id: deviceTwoId })
        expect(device).to.be.null;
        const devices = await Device.find();
        expect(devices.length).to.equal(1);
    })

    it('should delete all the device', async () => {
        const response = await request(app)
            .delete(`/devices`)
            .set('Authorization', `Bearer ${token}`)
            .send()
            .expect(200);
        // test db if it is modified
        const devices = await Device.find();
        expect(devices.length).to.equal(0);
    })
});
