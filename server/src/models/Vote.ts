import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import User from "./User";
import Answer from "./Review";

interface VoteAttributes {
  id: number;
  type: 'up' | 'down';
  answerId: number;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface VoteCreationAttributes extends Optional<VoteAttributes, "id"> {}

// TODO: Create the Vote class extending Model
class Vote
  extends Model<VoteAttributes, VoteCreationAttributes>
  implements VoteAttributes {
  // TODO: Declare public properties
}

// TODO: Initialize the Vote model
Vote.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.ENUM('up', 'down'),
      allowNull: false,
      validate: {
        isIn: {
          args: [['up', 'down']],
          msg: 'Vote type must be up or down',
        },
      },
    },
    answerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'answers',
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: "Vote",
    tableName: "votes",
    indexes: [
      // TODO: Add unique index for userId + answerId
      // This prevents a user from voting multiple times on same answer
      // {
      //   unique: true,
      //   fields: ['userId', 'answerId']
      // }
    ],
  },
);

export default Vote;
