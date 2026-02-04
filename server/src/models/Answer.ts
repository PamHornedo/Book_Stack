import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import User from './User';
import Question from './Question';

// TODO: Define Answer attributes interface
// Hint: Answer should have id, body, questionId, userId, createdAt, updatedAt
interface AnswerAttributes {
  // TODO: Add properties here
}

interface AnswerCreationAttributes extends Optional<AnswerAttributes, 'id'> {}

// TODO: Create the Answer class extending Model
class Answer extends Model<AnswerAttributes, AnswerCreationAttributes> implements AnswerAttributes {
  // TODO: Declare public properties
}

// TODO: Initialize the Answer model
Answer.init(
  {
    // TODO: Define model attributes
    // Remember:
    // - id should be primaryKey and autoIncrement
    // - body should be TEXT type and not null
    // - questionId should reference questions table
    // - userId should reference users table
  },
  {
    sequelize,
    modelName: 'Answer',
    tableName: 'answers'
  }
);

// TODO: Define associations
// Hint: An Answer belongs to a User
// Hint: An Answer belongs to a Question
// Hint: A Question can have many Answers
// Hint: A User can have many Answers

export default Answer;
