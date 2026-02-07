import { beforeEach, describe, expect, it, vi } from 'vitest';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../app';
import Book from '../models/Book';

vi.mock('../models/Book', () => ({
  default: {
    findAll: vi.fn(),
    findByPk: vi.fn(),
    create: vi.fn()
  }
}));

vi.mock('../models/User', () => ({
  default: {}
}));

vi.mock('../models/Review', () => ({
  default: {}
}));

vi.mock('../models/Index', () => ({}));

const mockedBook = Book as unknown as {
  findAll: ReturnType<typeof vi.fn>;
  findByPk: ReturnType<typeof vi.fn>;
  create: ReturnType<typeof vi.fn>;
};

const buildToken = (userId = 1) =>
  jwt.sign(
    { id: userId, email: 'owner@example.com', username: 'owner' },
    process.env.JWT_SECRET || 'test-secret',
    { expiresIn: '7d' }
  );

describe('Book routes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns all books', async () => {
    mockedBook.findAll.mockResolvedValue([
      {
        id: 1, title: 'Book One', author: 'Author', description: 'Desc', userId: 1,
        toJSON() { return { id: 1, title: 'Book One', author: 'Author', description: 'Desc', userId: 1, reviews: [] }; }
      }
    ]);

    const response = await request(app).get('/api/books');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].title).toBe('Book One');
    expect(response.body[0]._count).toEqual({ reviews: 0 });
    expect(mockedBook.findAll).toHaveBeenCalledWith(
      expect.objectContaining({ include: expect.any(Array) })
    );
  });

  it('returns 500 when listing books fails', async () => {
    mockedBook.findAll.mockRejectedValue(new Error('DB error'));

    const response = await request(app).get('/api/books');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Error fetching books' });
  });

  it('returns a single book by id', async () => {
    mockedBook.findByPk.mockResolvedValue({
      id: 2,
      title: 'Book Two',
      author: 'Author Two',
      description: 'Desc Two',
      userId: 1
    });

    const response = await request(app).get('/api/books/2');

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(2);
    expect(mockedBook.findByPk).toHaveBeenCalledWith(
      2,
      expect.objectContaining({ include: expect.any(Array) })
    );
  });

  it('returns 500 when fetching a book fails', async () => {
    mockedBook.findByPk.mockRejectedValue(new Error('DB error'));

    const response = await request(app).get('/api/books/2');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Error fetching book' });
  });

  it('rejects invalid book id on fetch', async () => {
    const response = await request(app).get('/api/books/not-a-number');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Invalid book id' });
  });

  it('returns 404 when book not found', async () => {
    mockedBook.findByPk.mockResolvedValue(null);

    const response = await request(app).get('/api/books/999');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Book not found' });
  });

  it('requires auth to create a book', async () => {
    const response = await request(app).post('/api/books').send({
      title: 'New Book',
      author: 'New Author',
      description: 'New Desc'
    });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'No token provided' });
  });

  it('creates a book for the authenticated user', async () => {
    mockedBook.create.mockResolvedValue({
      id: 3,
      title: 'New Book',
      author: 'New Author',
      description: 'New Desc',
      userId: 1
    });

    const response = await request(app)
      .post('/api/books')
      .set('Authorization', `Bearer ${buildToken(1)}`)
      .send({
        title: 'New Book',
        author: 'New Author',
        description: 'New Desc'
      });

    expect(response.status).toBe(201);
    expect(response.body.title).toBe('New Book');
    expect(mockedBook.create).toHaveBeenCalledWith({
      title: 'New Book',
      author: 'New Author',
      description: 'New Desc',
      userId: 1
    });
  });

  it('returns 500 when creating a book fails', async () => {
    mockedBook.create.mockRejectedValue(new Error('DB error'));

    const response = await request(app)
      .post('/api/books')
      .set('Authorization', `Bearer ${buildToken(1)}`)
      .send({
        title: 'New Book',
        author: 'New Author',
        description: 'New Desc'
      });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Error creating book' });
  });

  it('rejects missing fields when creating a book', async () => {
    const response = await request(app)
      .post('/api/books')
      .set('Authorization', `Bearer ${buildToken(1)}`)
      .send({ title: 'Only Title' });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'All fields are required' });
  });

  it('rejects empty fields when creating a book', async () => {
    const response = await request(app)
      .post('/api/books')
      .set('Authorization', `Bearer ${buildToken(1)}`)
      .send({ title: '  ', author: 'Author', description: 'Desc' });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'All fields are required' });
  });

  it('requires auth to update a book', async () => {
    const response = await request(app).put('/api/books/1').send({
      title: 'Updated',
      author: 'Updated',
      description: 'Updated'
    });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'No token provided' });
  });

  it('rejects invalid book id on update', async () => {
    const response = await request(app)
      .put('/api/books/not-a-number')
      .set('Authorization', `Bearer ${buildToken(1)}`)
      .send({ title: 'Updated', author: 'Updated', description: 'Updated' });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Invalid book id' });
  });

  it('returns 404 when updating a missing book', async () => {
    mockedBook.findByPk.mockResolvedValue(null);

    const response = await request(app)
      .put('/api/books/999')
      .set('Authorization', `Bearer ${buildToken(1)}`)
      .send({ title: 'Updated', author: 'Updated', description: 'Updated' });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Book not found' });
  });

  it('returns 500 when updating a book fails', async () => {
    mockedBook.findByPk.mockRejectedValue(new Error('DB error'));

    const response = await request(app)
      .put('/api/books/1')
      .set('Authorization', `Bearer ${buildToken(1)}`)
      .send({ title: 'Updated', author: 'Updated', description: 'Updated' });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Error updating book' });
  });

  it('forbids updates from non-owners', async () => {
    mockedBook.findByPk.mockResolvedValue({
      id: 1,
      title: 'Old',
      author: 'Old',
      description: 'Old',
      userId: 99,
      update: vi.fn().mockResolvedValue({})
    });

    const response = await request(app)
      .put('/api/books/1')
      .set('Authorization', `Bearer ${buildToken(1)}`)
      .send({ title: 'Updated' });

    expect(response.status).toBe(403);
    expect(response.body).toEqual({ message: 'Forbidden' });
  });

  it('updates a book for the owner', async () => {
    const updateMock = vi.fn().mockResolvedValue({});
    mockedBook.findByPk.mockResolvedValue({
      id: 1,
      title: 'Old',
      author: 'Old',
      description: 'Old',
      userId: 1,
      update: updateMock
    });

    const response = await request(app)
      .put('/api/books/1')
      .set('Authorization', `Bearer ${buildToken(1)}`)
      .send({
        title: 'Updated',
        author: 'Updated',
        description: 'Updated'
      });

    expect(response.status).toBe(200);
    expect(updateMock).toHaveBeenCalled();
  });

  it('rejects missing fields when updating a book', async () => {
    mockedBook.findByPk.mockResolvedValue({
      id: 1,
      title: 'Old',
      author: 'Old',
      description: 'Old',
      userId: 1,
      update: vi.fn().mockResolvedValue({})
    });

    const response = await request(app)
      .put('/api/books/1')
      .set('Authorization', `Bearer ${buildToken(1)}`)
      .send({ title: 'Updated' });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'All fields are required' });
  });

  it('rejects empty fields when updating a book', async () => {
    mockedBook.findByPk.mockResolvedValue({
      id: 1,
      title: 'Old',
      author: 'Old',
      description: 'Old',
      userId: 1,
      update: vi.fn().mockResolvedValue({})
    });

    const response = await request(app)
      .put('/api/books/1')
      .set('Authorization', `Bearer ${buildToken(1)}`)
      .send({ title: 'Updated', author: '  ', description: 'Updated' });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'All fields are required' });
  });

  it('requires auth to delete a book', async () => {
    const response = await request(app).delete('/api/books/1');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'No token provided' });
  });

  it('rejects invalid book id on delete', async () => {
    const response = await request(app)
      .delete('/api/books/not-a-number')
      .set('Authorization', `Bearer ${buildToken(1)}`);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Invalid book id' });
  });

  it('returns 404 when deleting a missing book', async () => {
    mockedBook.findByPk.mockResolvedValue(null);

    const response = await request(app)
      .delete('/api/books/999')
      .set('Authorization', `Bearer ${buildToken(1)}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Book not found' });
  });

  it('returns 500 when deleting a book fails', async () => {
    mockedBook.findByPk.mockRejectedValue(new Error('DB error'));

    const response = await request(app)
      .delete('/api/books/1')
      .set('Authorization', `Bearer ${buildToken(1)}`);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Error deleting book' });
  });

  it('forbids deletes from non-owners', async () => {
    mockedBook.findByPk.mockResolvedValue({
      id: 1,
      userId: 42,
      destroy: vi.fn().mockResolvedValue({})
    });

    const response = await request(app)
      .delete('/api/books/1')
      .set('Authorization', `Bearer ${buildToken(1)}`);

    expect(response.status).toBe(403);
    expect(response.body).toEqual({ message: 'Forbidden' });
  });

  it('deletes a book for the owner', async () => {
    const destroyMock = vi.fn().mockResolvedValue({});
    mockedBook.findByPk.mockResolvedValue({
      id: 1,
      userId: 1,
      destroy: destroyMock
    });

    const response = await request(app)
      .delete('/api/books/1')
      .set('Authorization', `Bearer ${buildToken(1)}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Book deleted' });
    expect(destroyMock).toHaveBeenCalled();
  });
});
