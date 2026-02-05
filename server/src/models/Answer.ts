import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface AnswerAttributes {
  id: number;
  body: string;
  questionId: number;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface AnswerCreationAttributes extends Optional<AnswerAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Answer extends Model<AnswerAttributes, AnswerCreationAttributes> implements AnswerAttributes {
  public id!: number;
  public body!: string;
  public questionId!: number;
  public userId!: number;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
}

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
