import { DataTypes, Model, Optional } from 'sequelize';
import bcrypt from 'bcrypt';
import sequelize from '../config/database';

// TODO: Define the User attributes interface
// Hint: User should have id, username, email, password, createdAt, updatedAt
interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?:Date;
}

// TODO: Define optional attributes for creation (id, timestamps are auto-generated)
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

process.env.BCRYPT_SALT_ROUNDS || '10'

// TODO: Create the User class extending Model
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public readonly createdAt?: Date;
  public readonly updatedAt?:Date;
}

// TODO: Initialize the User model
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
      validate: {
        notNull: {
          msg: 'Username is required'
        },
        notEmpty: {
          msg: 'Username is required'
        },
        len: {
          args: [3,50], 
          msg: 'Username must be between 3 and 50 characters'
        },
      }
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Username is required'
        },
        notEmpty: {
          msg: 'Username cannot be empty'
        },
        len: {
          args: [3, 20],
          msg: 'Username must be between 3 and 20 characters'
        },
      }
    },
    password: {
      type: DataTypes.STRING(255), 
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password is required'
        },
        notEmpty: {
          msg: 'Password cannot be empty'
        },
        len: {
          args: [3, 20],
          msg: 'Password must be between 3 and 255 characters'
        },
      }
    }

  },
  {
    
    sequelize,
    modelName: 'User',
    tableName: 'users',
    hooks: {
      // TODO: Add beforeCreate hook to hash password
      // Hint: Check if password exists and hash it with bcrypt
      beforeCreate: async (user: User) => {
        const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10')
        const hashedPassword = await bcrypt.hash(user.password, saltRounds)
        user.password = hashedPassword
        console.log('Password hashed in beforeCreate')
      },

      // TODO: Add beforeUpdate hook to hash password if changed
      // Hint: Use user.changed('password') to check if password was modified
      beforeUpdate: async (user: User) => {
        const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10')
        const hashedPassword = await bcrypt.hash(user.password, saltRounds)
        user.password = hashedPassword
        console.log('Password hashed in beforeUpdate')
      }
    }
  }
);

export default User;
