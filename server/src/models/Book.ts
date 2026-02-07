import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface BookAttributes {
  id: number;
  title: string;
  author: string;
  description: string;
  userId: number;
}

interface BookCreationAttributes extends Optional<BookAttributes, "id"> {}

class Book
  extends Model<BookAttributes, BookCreationAttributes>
  implements BookAttributes
{
  public id!: number;
  public title!: string;
  public author!: string;
  public description!: string;
  public userId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id",
    },
  },
  {
    sequelize,
    modelName: "book",
    tableName: "books",
    underscored: true,
  },
);

export default Book;
