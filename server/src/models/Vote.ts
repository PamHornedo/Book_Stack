import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import User from './User';
import Answer from './Answer';

// TODO: Define Vote attributes interface
// Hint: Vote should have id, value, answerId, userId, createdAt
interface VoteAttributes {
  // TODO: Add properties here
}

interface VoteCreationAttributes extends Optional<VoteAttributes, 'id'> {}

// TODO: Create the Vote class extending Model
class Vote extends Model<VoteAttributes, VoteCreationAttributes> implements VoteAttributes {
  // TODO: Declare public properties
}

// TODO: Initialize the Vote model
Vote.init(
  {
    // TODO: Define model attributes
    // Remember:
    // - id should be primaryKey and autoIncrement
    // - value should be INTEGER (1 for upvote, -1 for downvote)
    // - answerId should reference answers table
    // - userId should reference users table
    // - Add validation to ensure value is only 1 or -1
  },
  {
    sequelize,
    modelName: 'Vote',
    tableName: 'votes',
    indexes: [
      // TODO: Add unique index for userId + answerId
      // This prevents a user from voting multiple times on same answer
      // {
      //   unique: true,
      //   fields: ['userId', 'answerId']
      // }
    ]
  }
);

// TODO: Define associations
// Hint: A Vote belongs to a User
// Hint: A Vote belongs to an Answer
// Hint: An Answer can have many Votes

export default Vote;
