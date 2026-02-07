import { beforeEach, describe, expect, it, vi } from 'vitest';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../app';
import Review from '../models/Review';
import Book from '../models/Book';

vi.mock('../models/Review', () => ({
  default: {
    create: vi.fn(),
    findByPk: vi.fn()
  }
}));

vi.mock('../models/Book', () => ({
  default: {
    findByPk: vi.fn()
  }
}));

const mockedReview = Review as unknown as {
  create: ReturnType<typeof vi.fn>;
  findByPk: ReturnType<typeof vi.fn>;
};

const mockedBook = Book as unknown as {
  findByPk: ReturnType<typeof vi.fn>;
};

const buildToken = (userId = 1) =>
  jwt.sign(
    { id: userId, email: 'owner@example.com', username: 'owner' },
    process.env.JWT_SECRET || 'test-secret',
    { expiresIn: '7d' }
  );

describe('Review routes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('requires auth to create a review', async () => {
    const response = await request(app)
      .post('/api/books/1/reviews')
      .send({ body: 'Great book.' });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'No token provided' });
  });

  it('creates a review for a book', async () => {
    mockedBook.findByPk.mockResolvedValue({ id: 1 });
    mockedReview.create.mockResolvedValue({
      id: 10,
      body: 'Great book.',
      bookId: 1,
      userId: 1
    });

    const response = await request(app)
      .post('/api/books/1/reviews')
      .set('Authorization', `Bearer ${buildToken(1)}`)
      .send({ body: 'Great book.' });

    expect(response.status).toBe(201);
    expect(response.body.body).toBe('Great book.');
    expect(mockedReview.create).toHaveBeenCalledWith({
      body: 'Great book.',
      bookId: 1,
      userId: 1
    });
  });

  it('returns 404 when book is missing', async () => {
    mockedBook.findByPk.mockResolvedValue(null);

    const response = await request(app)
      .post('/api/books/999/reviews')
      .set('Authorization', `Bearer ${buildToken(1)}`)
      .send({ body: 'Great book.' });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Book not found' });
  });

  it('requires auth to update a review', async () => {
    const response = await request(app)
      .put('/api/reviews/1')
      .send({ body: 'Updated.' });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'No token provided' });
  });

  it('forbids updates from non-owners', async () => {
    mockedReview.findByPk.mockResolvedValue({
      id: 1,
      body: 'Old',
      userId: 2,
      update: vi.fn().mockResolvedValue({})
    });

    const response = await request(app)
      .put('/api/reviews/1')
      .set('Authorization', `Bearer ${buildToken(1)}`)
      .send({ body: 'Updated.' });

    expect(response.status).toBe(403);
    expect(response.body).toEqual({ message: 'Forbidden' });
  });

  it('updates a review for the owner', async () => {
    const updateMock = vi.fn().mockResolvedValue({});
    mockedReview.findByPk.mockResolvedValue({
      id: 1,
      body: 'Old',
      userId: 1,
      update: updateMock
    });

    const response = await request(app)
      .put('/api/reviews/1')
      .set('Authorization', `Bearer ${buildToken(1)}`)
      .send({ body: 'Updated.' });

    expect(response.status).toBe(200);
    expect(updateMock).toHaveBeenCalledWith({ body: 'Updated.' });
  });

  it('requires auth to delete a review', async () => {
    const response = await request(app).delete('/api/reviews/1');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'No token provided' });
  });

  it('forbids deletes from non-owners', async () => {
    mockedReview.findByPk.mockResolvedValue({
      id: 1,
      userId: 2,
      destroy: vi.fn().mockResolvedValue({})
    });

    const response = await request(app)
      .delete('/api/reviews/1')
      .set('Authorization', `Bearer ${buildToken(1)}`);

    expect(response.status).toBe(403);
    expect(response.body).toEqual({ message: 'Forbidden' });
  });

  it('deletes a review for the owner', async () => {
    const destroyMock = vi.fn().mockResolvedValue({});
    mockedReview.findByPk.mockResolvedValue({
      id: 1,
      userId: 1,
      destroy: destroyMock
    });

    const response = await request(app)
      .delete('/api/reviews/1')
      .set('Authorization', `Bearer ${buildToken(1)}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Review deleted' });
    expect(destroyMock).toHaveBeenCalled();
  });
});
