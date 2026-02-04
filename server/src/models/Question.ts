import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

// TODO: Define Question attributes interface
// Hint: Question should have id, title, body, userId, createdAt, updatedAt
interface QuestionAttributes {
  // TODO: Add properties here
}

interface QuestionCreationAttributes extends Optional<QuestionAttributes, 'id'> {}

// TODO: Create the Question class extending Model
class Question extends Model<QuestionAttributes, QuestionCreationAttributes> implements QuestionAttributes {
  // TODO: Declare public properties
}

// TODO: Initialize the Question model
Question.init(
  {
    // TODO: Define model attributes
    // Remember:
    // - id should be primaryKey and autoIncrement
    // - title should be not null with minimum length
    // - body should be TEXT type and not null
    // - userId should reference the users table
  },
  {
    sequelize,
    modelName: 'Question',
    tableName: 'questions'
  }
);

// TODO: Define associations
// Hint: A Question belongs to a User
// Hint: A User can have many Questions
// Question.belongsTo(User, { ... });
// User.hasMany(Question, { ... });

export default Question;
