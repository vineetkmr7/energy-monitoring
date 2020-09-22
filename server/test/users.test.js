const assert = require('assert');
const request = require('supertest');
const app = require('../app');
const { User } = require('../app/models');
const expect = require('chai').expect;
const Constants = require('../app/constants/constants');


describe('User suite', () => {
    const userOne = {
        name: "Vineet Kumar",
        email: "vineetkumar@outlook.in",
        password: "testtest"
    }
    let token;
    before(async () => {
        await User.deleteMany();
    })
    after(async () => {
        await User.deleteMany();
    })
    it('should register a user ', async () => {
        const response = await request(app)
            .post('/users')
            .send(userOne)
            .expect(201);
        expect(response.body.response.token).to.be.a('string');
        token = response.body.response.token;
    })

    it('should get a profile', async () => {
        const response = await request(app)
            .get('/users/me')
            .set('Authorization', `Bearer ${token}`)
            .send()
            .expect(200);
        expect(response.body.response.name).to.equal(userOne.name);
        expect(response.body.response.email).to.equal(userOne.email);
    })

    it('should update user name', async () => {
        let modify = {
            name: 'Vineet'
        }
        const response = await request(app)
            .patch('/users/me')
            .set('Authorization', `Bearer ${token}`)
            .send(modify)
            .expect(200);
        expect(response.body.response.name).to.equal(modify.name);
        expect(response.body.response.email).to.equal(userOne.email);
    })

    it('should logout', async () => {
        await request(app)
            .post('/users/logout')
            .set('Authorization', `Bearer ${token}`)
            .send()
            .expect(200);
        // try getting profile after logout and should fail
        await request(app)
            .get('/users/me')
            .set('Authorization', `Bearer ${token}`)
            .send()
            .expect(401);

    })

    it('should login', async () => {
        const credentials = {
            email: userOne.email,
            password: userOne.password
        }
        const response = await request(app)
            .post('/users/login')
            .send(credentials)
            .expect(200);
        expect(response.body.message).to.equal(Constants.USER_LOGGED_IN);
        token = response.body.response.token;
    })

    it('should logoutAll', async () => {
        await request(app)
            .post('/users/logoutAll')
            .set('Authorization', `Bearer ${token}`)
            .send()
            .expect(200);
        // try getting profile after logout and should fail
        await request(app)
            .get('/users/me')
            .set('Authorization', `Bearer ${token}`)
            .send()
            .expect(401);
    })

    it('should login again', async () => {
        const credentials = {
            email: userOne.email,
            password: userOne.password
        }
        const response = await request(app)
            .post('/users/login')
            .send(credentials)
            .expect(200);
        expect(response.body.message).to.equal(Constants.USER_LOGGED_IN);
        token = response.body.response.token;
    })

    it('should delete user', async () => {
        await request(app)
            .delete('/users/me')
            .set('Authorization', `Bearer ${token}`)
            .send()
            .expect(200);
        // try should not be able to login with this user
        const credentials = {
            email: userOne.email,
            password: userOne.password
        }
        await request(app)
            .post('/users/login')
            .send(credentials)
            .expect(400);
    })

});
