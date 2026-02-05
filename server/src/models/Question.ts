import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface QuestionAttributes {
  id: number;
  title: string;
  body: string;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface QuestionCreationAttributes extends Optional<QuestionAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Question extends Model<QuestionAttributes, QuestionCreationAttributes> implements QuestionAttributes {
  public id!: number;
  public title!: string;
  public body!: string;
  public userId!: number;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
}

Question.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: {
        notNull: { msg: 'Title is required' },
        notEmpty: { msg: 'Title is required' },
        len: { args: [3, 200], msg: 'Title must be between 3 and 200 characters' },
      },
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: 'Body is required' },
        notEmpty: { msg: 'Body is required' },
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
    modelName: 'Question',
    tableName: 'questions',
    underscored: true,
  }
);

export default Question;
