import { beforeEach, describe, expect, it, vi } from 'vitest';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import app from '../app';
import User from '../models/User';

vi.mock('../models/User', () => ({
  default: {
    findOne: vi.fn(),
    create: vi.fn(),
    findByPk: vi.fn()
  }
}));

const mockedUser = User as unknown as {
  findOne: ReturnType<typeof vi.fn>;
  create: ReturnType<typeof vi.fn>;
  findByPk: ReturnType<typeof vi.fn>;
};

describe('Auth routes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('registers a user and returns a JWT', async () => {
    mockedUser.findOne.mockResolvedValue(null);
    mockedUser.create.mockResolvedValue({
      id: 1,
      username: 'testuser',
      email: 'testuser@example.com',
      createdAt: new Date('2024-01-01T00:00:00Z')
    });

    const response = await request(app).post('/api/auth/register').send({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123'
    });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeTypeOf('string');
    expect(response.body.user).toMatchObject({
      id: 1,
      username: 'testuser',
      email: 'testuser@example.com'
    });

    const decoded = jwt.verify(response.body.token, process.env.JWT_SECRET || 'test-secret');
    expect((decoded as any).email).toBe('testuser@example.com');
  });

  it('rejects registration with missing fields', async () => {
    const response = await request(app).post('/api/auth/register').send({
      email: 'missing@example.com'
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'All fields are required' });
  });

  it('rejects registration when user already exists', async () => {
    mockedUser.findOne.mockResolvedValue({ id: 2 });

    const response = await request(app).post('/api/auth/register').send({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123'
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'User already exists' });
  });

  it('logs in a user and returns a JWT', async () => {
    const hashedPassword = await bcrypt.hash('password123', 10);
    mockedUser.findOne.mockResolvedValue({
      id: 1,
      username: 'testuser',
      email: 'testuser@example.com',
      password: hashedPassword,
      createdAt: new Date('2024-01-01T00:00:00Z')
    });

    const response = await request(app).post('/api/auth/login').send({
      email: 'testuser@example.com',
      password: 'password123'
    });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeTypeOf('string');
    expect(response.body.user.email).toBe('testuser@example.com');
  });

  it('rejects login with invalid credentials', async () => {
    mockedUser.findOne.mockResolvedValue(null);

    const response = await request(app).post('/api/auth/login').send({
      email: 'testuser@example.com',
      password: 'password123'
    });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'Invalid credentials' });
  });

  it('protects the profile route without a token', async () => {
    const response = await request(app).get('/api/auth/profile');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'No token provided' });
  });

  it('returns the current user profile with a valid token', async () => {
    mockedUser.findByPk.mockResolvedValue({
      id: 1,
      username: 'testuser',
      email: 'testuser@example.com',
      createdAt: new Date('2024-01-01T00:00:00Z')
    });

    const token = jwt.sign(
      { id: 1, email: 'testuser@example.com', username: 'testuser' },
      process.env.JWT_SECRET || 'test-secret',
      { expiresIn: '7d' }
    );

    const response = await request(app)
      .get('/api/auth/profile')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.email).toBe('testuser@example.com');
  });
});
