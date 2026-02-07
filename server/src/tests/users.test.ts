import { beforeEach, describe, expect, it, vi } from 'vitest';
import request from 'supertest';
import app from '../app';
import User from '../models/User';

vi.mock('../models/User', () => ({
  default: {
    findAll: vi.fn(),
    findByPk: vi.fn()
  }
}));

const mockedUser = User as unknown as {
  findAll: ReturnType<typeof vi.fn>;
  findByPk: ReturnType<typeof vi.fn>;
};

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
});
