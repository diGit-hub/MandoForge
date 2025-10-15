const request = require('supertest');
const app = require('../server.js');
const connectDB = require('../config/db');
const User = require('../models/User');
const mongoose = require('mongoose');
require('dotenv').config();

let createdUserId = null;

beforeAll(async () => {
  await connectDB();
});

beforeEach(async () => {
  const res = await request(app)
    .post('/api/auth/register')
    .send({ username: 'testuser', password: 'password123' });
  createdUserId = res.body.user._id;
});

afterEach(async () => {
  if (createdUserId) {
    await User.findByIdAndDelete(createdUserId);
  }
  createdUserId = null;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Authentication Routes', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ username: 'testuser2', password: 'password123' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', 'User registered successfully');
    expect(res.body.user).toHaveProperty('username', 'testuser2');
  });

  it('should login with correct credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'testuser', password: 'password123' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Login successful');
    expect(res.body).toHaveProperty('token');
  });
});
