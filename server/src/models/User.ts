import { DataTypes, Model, Optional } from 'sequelize';
import bcrypt from 'bcrypt';
import sequelize from '../config/database';

// TODO: Define the User attributes interface
// Hint: User should have id, username, email, password, createdAt, updatedAt
interface UserAttributes {
  // TODO: Add properties here
}

// TODO: Define optional attributes for creation (id, timestamps are auto-generated)
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// TODO: Create the User class extending Model
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  // TODO: Declare public properties here
  // Example: public id!: number;
}

// TODO: Initialize the User model
User.init(
  {
    // TODO: Define your model attributes here
    // Remember:
    // - id should be primaryKey and autoIncrement
    // - username should be unique and not null
    // - email should be unique, not null, and validated as email
    // - password should be not null with minimum length
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    hooks: {
      // TODO: Add beforeCreate hook to hash password
      // Hint: Check if password exists and hash it with bcrypt
      // async beforeCreate(user: User) { ... }

      // TODO: Add beforeUpdate hook to hash password if changed
      // Hint: Use user.changed('password') to check if password was modified
      // async beforeUpdate(user: User) { ... }
    }
  }
);

export default User;
