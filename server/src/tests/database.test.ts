import { afterEach, describe, expect, it, vi } from 'vitest';
import sequelize, { testConnection } from '../config/database';

describe('Database config', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('logs a message when connection succeeds', async () => {
    const authSpy = vi.spyOn(sequelize, 'authenticate').mockResolvedValue();
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    await testConnection();

    expect(authSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalled();
  });

  it('exits process when connection fails', async () => {
    const authSpy = vi.spyOn(sequelize, 'authenticate').mockRejectedValue(new Error('DB error'));
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const exitSpy = vi
      .spyOn(process, 'exit')
      .mockImplementation(((code?: number) => {
        throw new Error(`process.exit:${code}`);
      }) as never);

    await expect(testConnection()).rejects.toThrow('process.exit:1');

    expect(authSpy).toHaveBeenCalled();
    expect(errorSpy).toHaveBeenCalled();
    expect(exitSpy).toHaveBeenCalledWith(1);
  });
});
