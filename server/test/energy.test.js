const assert = require('assert');
const request = require('supertest');
const app = require('../app');
const { User, Device } = require('../app/models');
const expect = require('chai').expect;
const Constants = require('../app/constants/constants');
const mongoose = require('mongoose');


describe('Device suite', () => {
    const userOne = {
        name: "Vineet Kumar",
        email: "vineetkumar@outlook.in",
        password: "testtest"
    }
    const deviceOne = {
        name: "TV",
        powerConsumed: 40,
        status: 'OFFLINE',
        _id: mongoose.Types.ObjectId()
    }
    let deviceOneId = deviceOne._id;
    const deviceTwo = {
        name: "Bulb",
        powerConsumed: 20,
        status: 'ONLINE',
        _id: mongoose.Types.ObjectId()
    }
    let deviceTwoId = deviceTwo._id;
    let token;
    before(async () => {
        await User.deleteMany();
        await Device.deleteMany();
        const response = await request(app)
            .post('/users')
            .send(userOne)
            .expect(201);
        token = response.body.response.token;
        await Device.insertMany([deviceOne, deviceTwo]);

    })
    after(async () => {
        await request(app)
            .post('/users/logout')
            .set('Authorization', `Bearer ${token}`)
            .send()
            .expect(200);
            await Device.deleteMany();
    })

    it("shoud get total power consumption ", async () => {
        const response = await request(app)
            .get('/energy')
            .set('Authorization', `Bearer ${token}`)
            .send()
            .expect(200);
        expect(response.body.response.totalPowerConsumed).to.equal(deviceOne.powerConsumed + deviceTwo.powerConsumed);
    })

    it("shoud get stats ", async () => {
        const response = await request(app)
            .get('/energy/stats')
            .set('Authorization', `Bearer ${token}`)
            .send()
            .expect(200);
        expect(response.body.response.totalPowerConsumed).to.equal(deviceOne.powerConsumed + deviceTwo.powerConsumed);
        expect(response.body.response.onlineDevices).to.equal(1);
        expect(response.body.response.offlineDevices).to.equal(1);
        expect(response.body.response.totalDevices).to.equal(2);
    })

});
