import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface VoteAttributes {
  id: number;
  type: 'up' | 'down';
  answerId: number;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface VoteCreationAttributes extends Optional<VoteAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Vote extends Model<VoteAttributes, VoteCreationAttributes> implements VoteAttributes {
  public id!: number;
  public type!: 'up' | 'down';
  public answerId!: number;
  public userId!: number;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
}

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
    modelName: 'Vote',
    tableName: 'votes',
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['answer_id', 'user_id'],
      },
    ],
  }
);

export default Vote;
