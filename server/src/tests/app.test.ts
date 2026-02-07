import { describe, expect, it } from 'vitest';
import request from 'supertest';
import app from '../app';

describe('App routes', () => {
  it('returns health status', async () => {
    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: 'ok',
      message: 'Book Stack API is running!'
    });
  });
});
