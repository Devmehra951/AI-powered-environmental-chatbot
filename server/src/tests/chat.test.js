import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../app.js';
import Message from '../models/Message.js';

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterEach(async () => {
  await Message.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Chat API', () => {
  it('should return validation error for short message', async () => {
    const res = await request(app).post('/api/chat').send({ message: 'a' });
    expect(res.status).toBe(400);
  });

  it('should create feedback only for valid message ID', async () => {
    const res = await request(app).post('/api/feedback').send({ messageId: '123', rating: 'up' });
    expect(res.status).toBe(400);
  });
});
