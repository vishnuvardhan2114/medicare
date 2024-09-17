// __tests__/medicine.test.js
const request = require('supertest');
const app = require('../app'); // Your Express app
const Medicine = require('../models/Medicine');

describe('POST /api/medicines', () => {
  it('should create a new medicine', async () => {
    const res = await request(app)
      .post('/api/medicines')
      .set('x-auth-token', 'validToken')
      .send({
        name: 'Paracetamol',
        manufacturer: 'ABC Pharma',
        price: 10,
        stock: 100,
        discount: 5,
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('name', 'Paracetamol');
  });
});
