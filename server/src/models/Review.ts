import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import User from "./User";
import Question from "./Book";

interface AnswerAttributes {
  id: number;
  body: string;
  questionId: number;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface AnswerCreationAttributes extends Optional<AnswerAttributes, "id"> {}

// TODO: Create the Answer class extending Model
class Answer
  extends Model<AnswerAttributes, AnswerCreationAttributes>
  implements AnswerAttributes {
  // TODO: Declare public properties
}

// TODO: Initialize the Answer model
Answer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: 'Body is required' },
        notEmpty: { msg: 'Body is required' },
      },
    },
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'questions',
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
    modelName: 'Answer',
    tableName: 'answers',
    underscored: true,
  }
);

export default Answer;
