import { beforeEach, describe, expect, it, vi } from 'vitest';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../app';
import User from '../models/User';
import Book from '../models/Book';
import Review from '../models/Review';

vi.mock('../models/User', () => ({
  default: {
    findAll: vi.fn(),
    findByPk: vi.fn()
  }
}));

vi.mock('../models/Book', () => ({
  default: {
    count: vi.fn()
  }
}));

vi.mock('../models/Review', () => ({
  default: {
    count: vi.fn()
  }
}));

vi.mock('../models/Index', () => ({}));

const mockedUser = User as unknown as {
  findAll: ReturnType<typeof vi.fn>;
  findByPk: ReturnType<typeof vi.fn>;
};

const mockedBook = Book as unknown as {
  count: ReturnType<typeof vi.fn>;
};

const mockedReview = Review as unknown as {
  count: ReturnType<typeof vi.fn>;
};

const buildToken = (userId = 1) =>
  jwt.sign(
    { id: userId, email: 'user@example.com', username: 'testuser' },
    process.env.JWT_SECRET || 'test-secret',
    { expiresIn: '7d' }
  );

describe('User routes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns all users', async () => {
    mockedUser.findAll.mockResolvedValue([
      { id: 1, username: 'user1', email: 'user1@example.com' }
    ]);

    const response = await request(app).get('/api/users');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].email).toBe('user1@example.com');
  });

  it('returns 500 when user list fails', async () => {
    mockedUser.findAll.mockRejectedValue(new Error('DB error'));

    const response = await request(app).get('/api/users');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Error fetching users' });
  });

  it('returns a user by id', async () => {
    mockedUser.findByPk.mockResolvedValue({
      id: 2,
      username: 'user2',
      email: 'user2@example.com'
    });

    const response = await request(app).get('/api/users/2');

    expect(response.status).toBe(200);
    expect(response.body.email).toBe('user2@example.com');
  });

  it('rejects invalid user id', async () => {
    const response = await request(app).get('/api/users/not-a-number');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Invalid user id' });
  });

  it('returns 404 when user not found', async () => {
    mockedUser.findByPk.mockResolvedValue(null);

    const response = await request(app).get('/api/users/999');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'User not found' });
  });

  it('returns 500 when user lookup fails', async () => {
    mockedUser.findByPk.mockRejectedValue(new Error('DB error'));

    const response = await request(app).get('/api/users/1');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Error fetching user' });
  });

  it('requires auth for /stats', async () => {
    const response = await request(app).get('/api/users/stats');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'No token provided' });
  });

  it('returns stats for the authenticated user', async () => {
    mockedBook.count.mockResolvedValue(3);
    mockedReview.count.mockResolvedValue(7);

    const response = await request(app)
      .get('/api/users/stats')
      .set('Authorization', `Bearer ${buildToken(1)}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ books: 3, reviews: 7 });
  });

  it('returns 500 when stats lookup fails', async () => {
    mockedBook.count.mockRejectedValue(new Error('DB error'));

    const response = await request(app)
      .get('/api/users/stats')
      .set('Authorization', `Bearer ${buildToken(1)}`);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Error fetching user stats' });
  });
});
