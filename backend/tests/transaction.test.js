// const request = require('supertest');
// const app = require('../app.js');
// const mongoose = require('mongoose');
// const { MongoMemoryServer } = require('mongodb-memory-server');

// let mongoServer;
// let authToken;

// beforeAll(async () => {
//   mongoServer = await MongoMemoryServer.create();
//   await mongoose.connect(mongoServer.getUri());

//   // Create a test user and get token
//   const res = await request(app)
//     .post('/v1/auth/register')
//     .send({
//       userType: 'customer',
//       username: 'TxUser',
//       password: 'Password123!',
//       firstName: 'Tx',
//       lastName: 'User',
//       nationalId: '9876543210'
//     });
//   authToken = res.body.token;
// });

// afterAll(async () => {
//   await mongoose.disconnect();
//   await mongoServer.stop();
// });

// describe('Transaction API', () => {
//   it('should create a transaction', async () => {
//     const res = await request(app)
//       .post('/v1/transaction/createTransaction')
//       .set('Authorization', `Bearer ${authToken}`)
//       .send({ status: true, customerBankId: ['bank123'] });

//     expect(res.statusCode).toBe(201);
//     expect(res.body).toHaveProperty('transactionId');
//   });

//   it('should get all transactions', async () => {
//     const res = await request(app)
//       .get('/v1/transaction/getTransactions')
//       .set('Authorization', `Bearer ${authToken}`);

//     expect(res.statusCode).toBe(200);
//     expect(Array.isArray(res.body)).toBe(true);
//   });
// });
