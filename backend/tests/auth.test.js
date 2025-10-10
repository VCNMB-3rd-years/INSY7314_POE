// const request = require('supertest');
// const app = require('../app.js');
// const mongoose = require('mongoose');
// const { MongoMemoryServer } = require('mongodb-memory-server');

// let mongoServer;

// beforeAll(async () => {
//   mongoServer = await MongoMemoryServer.create();
//   await mongoose.connect(mongoServer.getUri());
// });

// afterAll(async () => {
//   await mongoose.disconnect();
//   await mongoServer.stop();
// });

// describe('Auth API', () => {
//   it('should register a new customer', async () => {
//     const res = await request(app)
//       .post('/v1/auth/register')
//       .send({
//         userType: 'customer',
//         username: 'mina',
//         password: 'MinaPassword123!',
//         firstName: 'Mina',
//         lastName: 'P',
//         nationalId: '1234567890'
//       });

//     expect(res.statusCode).toBe(200);
//     expect(res.body).toHaveProperty('token');
//   });

//   it('should not register a duplicate user', async () => {
//     const res = await request(app)
//       .post('/v1/auth/register')
//       .send({
//         userType: 'customer',
//         username: 'TestUser',
//         password: 'Password123!',
//         firstName: 'Test',
//         lastName: 'User',
//         nationalId: '1234567890'
//       });

//     expect(res.statusCode).toBe(400);
//     expect(res.body.message).toBe('Username already exists.');
//   });

//   it('should login an existing user', async () => {
//     const res = await request(app)
//       .post('/v1/auth/login')
//       .send({ userType: 'customer', username: 'TestUser', password: 'Password123!' });

//     expect(res.statusCode).toBe(200);
//     expect(res.body).toHaveProperty('token');
//   });
// });
