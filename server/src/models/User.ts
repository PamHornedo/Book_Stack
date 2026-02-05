import { DataTypes, Model, Optional } from 'sequelize';
import bcrypt from 'bcrypt';
import sequelize from '../config/database';

interface UserAttributes {
  id: number;
  username: string;
  email: string;
  passwordHash: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes
  extends Optional<UserAttributes, 'id' | 'passwordHash' | 'createdAt' | 'updatedAt'> {
  password?: string;
}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public passwordHash!: string;
  public password?: string;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: 'Username is required' },
        notEmpty: { msg: 'Username is required' },
        len: { args: [3, 50], msg: 'Username must be between 3 and 50 characters' },
      },
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: 'Email is required' },
        notEmpty: { msg: 'Email is required' },
        isEmail: { msg: 'Email must be a valid email address' },
      },
    },
    passwordHash: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'password_hash',
      validate: {
        notNull: { msg: 'Password is required' },
        notEmpty: { msg: 'Password is required' },
      },
    },
    password: {
      type: DataTypes.VIRTUAL,
      validate: {
        len: { args: [8, 255], msg: 'Password must be at least 8 characters' },
      },
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    underscored: true,
    hooks: {
      beforeValidate: async (user: User) => {
        if (!user.password) {
          return;
        }
        const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10);
        user.passwordHash = await bcrypt.hash(user.password, saltRounds);
        (user as User & { _passwordHashed?: boolean })._passwordHashed = true;
      },
      beforeCreate: async (user: User) => {
        if (!user.password || (user as User & { _passwordHashed?: boolean })._passwordHashed) {
          return;
        }
        const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10);
        user.passwordHash = await bcrypt.hash(user.password, saltRounds);
      },
      beforeUpdate: async (user: User) => {
        if (!user.password || (user as User & { _passwordHashed?: boolean })._passwordHashed) {
          return;
        }
        const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10);
        user.passwordHash = await bcrypt.hash(user.password, saltRounds);
      },
    },
  }
);

export default User;
