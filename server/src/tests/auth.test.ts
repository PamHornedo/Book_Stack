import { beforeEach, describe, expect, it, vi } from 'vitest';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../app';
import User from '../models/User';

vi.mock('../models/User', () => ({
  default: {
    findOne: vi.fn(),
    create: vi.fn(),
    findByPk: vi.fn()
  }
}));

vi.mock('../models/Index', () => ({}));

const mockedUser = User as unknown as {
  findOne: ReturnType<typeof vi.fn>;
  create: ReturnType<typeof vi.fn>;
  findByPk: ReturnType<typeof vi.fn>;
};

const restoreSecret = (value: string | undefined) => {
  if (value === undefined) {
    delete process.env.JWT_SECRET;
    return;
  }
  process.env.JWT_SECRET = value;
};

describe('Auth routes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('registers a user', async () => {
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

    expect(response.status).toBe(201);
    expect(response.body.token).toBeTypeOf('string');
    expect(response.body.user).toMatchObject({
      id: 1,
      username: 'testuser',
      email: 'testuser@example.com'
    });
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

    expect(response.status).toBe(409);
    expect(response.body).toEqual({ message: 'User already exists' });
  });

  it('rejects registration when validation fails', async () => {
    mockedUser.findOne.mockResolvedValue(null);
    mockedUser.create.mockRejectedValue({
      name: 'SequelizeValidationError',
      errors: [{ message: 'Username is required' }]
    });

    const response = await request(app).post('/api/auth/register').send({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123'
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Username is required' });
  });

  it('rejects registration with unique constraint errors', async () => {
    mockedUser.findOne.mockResolvedValue(null);
    mockedUser.create.mockRejectedValue({
      name: 'SequelizeUniqueConstraintError',
      errors: [{ message: 'Email already exists' }]
    });

    const response = await request(app).post('/api/auth/register').send({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123'
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Email already exists' });
  });

  it('returns 500 when registration fails unexpectedly', async () => {
    mockedUser.findOne.mockResolvedValue(null);
    mockedUser.create.mockRejectedValue(new Error('DB error'));

    const response = await request(app).post('/api/auth/register').send({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123'
    });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Something went wrong!' });
  });

  it('returns 500 when JWT secret is missing on register', async () => {
    const originalSecret = process.env.JWT_SECRET;
    delete process.env.JWT_SECRET;
    mockedUser.findOne.mockResolvedValue(null);

    const response = await request(app).post('/api/auth/register').send({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123'
    });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'JWT secret not configured' });
    restoreSecret(originalSecret);
  });

  it('logs in a user and returns a JWT', async () => {
    mockedUser.findOne.mockResolvedValue({
      id: 1,
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'hashed-password',
      createdAt: new Date('2024-01-01T00:00:00Z'),
      comparePassword: vi.fn().mockResolvedValue(true)
    });

    const response = await request(app).post('/api/auth/login').send({
      email: 'testuser@example.com',
      password: 'password123'
    });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeTypeOf('string');
    expect(response.body.user.email).toBe('testuser@example.com');
  });

  it('rejects login when user is not found', async () => {
    mockedUser.findOne.mockResolvedValue(null);

    const response = await request(app).post('/api/auth/login').send({
      email: 'testuser@example.com',
      password: 'password123'
    });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'Invalid credentials' });
  });

  it('rejects login with missing fields', async () => {
    const response = await request(app).post('/api/auth/login').send({
      email: 'testuser@example.com'
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Email and password are required' });
  });

  it('rejects login with invalid credentials', async () => {
    mockedUser.findOne.mockResolvedValue({
      id: 1,
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'hashed-password',
      createdAt: new Date('2024-01-01T00:00:00Z'),
      comparePassword: vi.fn().mockResolvedValue(false)
    });

    const response = await request(app).post('/api/auth/login').send({
      email: 'testuser@example.com',
      password: 'password123'
    });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'Invalid credentials' });
  });

  it('returns 500 when JWT secret is missing on login', async () => {
    const originalSecret = process.env.JWT_SECRET;
    delete process.env.JWT_SECRET;
    mockedUser.findOne.mockResolvedValue({
      id: 1,
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'hashed-password',
      createdAt: new Date('2024-01-01T00:00:00Z'),
      comparePassword: vi.fn().mockResolvedValue(true)
    });

    const response = await request(app).post('/api/auth/login').send({
      email: 'testuser@example.com',
      password: 'password123'
    });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'JWT secret not configured' });
    restoreSecret(originalSecret);
  });

  it('returns 500 when login fails unexpectedly', async () => {
    mockedUser.findOne.mockRejectedValue(new Error('DB error'));

    const response = await request(app).post('/api/auth/login').send({
      email: 'testuser@example.com',
      password: 'password123'
    });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Something went wrong!' });
  });

  it('protects the profile route without a token', async () => {
    const response = await request(app).get('/api/auth/profile');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'No token provided' });
  });

  it('rejects profile request with bearer but no token', async () => {
    const response = await request(app)
      .get('/api/auth/profile')
      .set('Authorization', 'Bearer');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'No token provided' });
  });

  it('rejects profile request with invalid token', async () => {
    const response = await request(app)
      .get('/api/auth/profile')
      .set('Authorization', 'Bearer invalid-token');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'Invalid token' });
  });

  it('returns 500 when JWT secret is missing on profile', async () => {
    const originalSecret = process.env.JWT_SECRET;
    const token = jwt.sign(
      { id: 1, email: 'testuser@example.com', username: 'testuser' },
      'test-secret',
      { expiresIn: '7d' }
    );
    delete process.env.JWT_SECRET;

    const response = await request(app)
      .get('/api/auth/profile')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'JWT secret not configured' });
    restoreSecret(originalSecret);
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

  it('returns 404 when profile user is missing', async () => {
    mockedUser.findByPk.mockResolvedValue(null);

    const token = jwt.sign(
      { id: 1, email: 'testuser@example.com', username: 'testuser' },
      process.env.JWT_SECRET || 'test-secret',
      { expiresIn: '7d' }
    );

    const response = await request(app)
      .get('/api/auth/profile')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'User not found' });
  });

  it('returns 500 when profile lookup fails', async () => {
    mockedUser.findByPk.mockRejectedValue(new Error('DB error'));

    const token = jwt.sign(
      { id: 1, email: 'testuser@example.com', username: 'testuser' },
      process.env.JWT_SECRET || 'test-secret',
      { expiresIn: '7d' }
    );

    const response = await request(app)
      .get('/api/auth/profile')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Something went wrong!' });
  });
});
