import { beforeEach, describe, expect, it, vi } from 'vitest';
import bcrypt from 'bcrypt';
import User from '../models/User';

vi.mock('bcrypt', () => ({
  default: {
    hash: vi.fn(),
    compare: vi.fn()
  },
  hash: vi.fn(),
  compare: vi.fn()
}));

const runHook = async (hook: unknown, user: User) => {
  if (Array.isArray(hook)) {
    for (const fn of hook) {
      await fn(user);
    }
    return;
  }
  if (typeof hook === 'function') {
    await hook(user);
  }
};

describe('User model', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('comparePassword delegates to bcrypt', async () => {
    const compareMock = bcrypt.compare as ReturnType<typeof vi.fn>;
    compareMock.mockResolvedValue(true);

    const user = User.build({
      username: 'tester',
      email: 'tester@example.com',
      password: 'hashed-password'
    });

    const result = await user.comparePassword('plain-password');

    expect(result).toBe(true);
    expect(compareMock).toHaveBeenCalledWith('plain-password', 'hashed-password');
  });

  it('beforeValidate hashes password into passwordHash', async () => {
    const hashMock = bcrypt.hash as ReturnType<typeof vi.fn>;
    hashMock.mockResolvedValue('hashed-value');

    const user = User.build({
      username: 'tester',
      email: 'tester@example.com',
      password: 'plain-password'
    });

    await runHook(User.options.hooks?.beforeValidate, user);

    expect(hashMock).toHaveBeenCalled();
    expect((user as User & { passwordHash?: string }).passwordHash).toBe('hashed-value');
    expect((user as User & { _passwordHashed?: boolean })._passwordHashed).toBe(true);
  });

  it('beforeCreate hashes the password field', async () => {
    const hashMock = bcrypt.hash as ReturnType<typeof vi.fn>;
    hashMock.mockResolvedValue('hashed-value');

    const user = User.build({
      username: 'tester',
      email: 'tester@example.com',
      password: 'plain-password'
    });

    await runHook(User.options.hooks?.beforeCreate, user);

    expect(hashMock).toHaveBeenCalled();
    expect(user.password).toBe('hashed-value');
  });

  it('beforeUpdate hashes password when changed', async () => {
    const hashMock = bcrypt.hash as ReturnType<typeof vi.fn>;
    hashMock.mockResolvedValue('hashed-value');

    const user = User.build({
      username: 'tester',
      email: 'tester@example.com',
      password: 'new-password'
    });
    vi.spyOn(user, 'changed').mockReturnValue(true);

    await runHook(User.options.hooks?.beforeUpdate, user);

    expect(hashMock).toHaveBeenCalled();
    expect(user.password).toBe('hashed-value');
  });

  it('beforeUpdate skips hashing when password not changed', async () => {
    const hashMock = bcrypt.hash as ReturnType<typeof vi.fn>;

    const user = User.build({
      username: 'tester',
      email: 'tester@example.com',
      password: 'new-password'
    });
    vi.spyOn(user, 'changed').mockReturnValue(false);

    await runHook(User.options.hooks?.beforeUpdate, user);

    expect(hashMock).not.toHaveBeenCalled();
  });
});
