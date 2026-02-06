import { DataTypes, Model, Optional } from "sequelize";
import bcrypt from "bcrypt";
import sequelize from "../config/database";

// Define the User attributes interface
interface UserAttributes {
  id: number;
  username: string;
  email: string;
  passwordHash: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define optional attributes for creation (id, timestamps are auto-generated)
interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

process.env.BCRYPT_SALT_ROUNDS || "10";

// Create the User class extending Model
class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

// Initialize the User model
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Username is required",
        },
        notEmpty: {
          msg: "Username is required",
        },
        len: {
          args: [3, 50],
          msg: "Username must be between 3 and 50 characters",
        },
      },
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: "Email is required" },
        notEmpty: { msg: "Email cannot be empty" },
        isEmail: { msg: "Must be a valid email address" },
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'password_hash',
      validate: {
        notNull: { msg: "Password is required" },
        notEmpty: { msg: "Password cannot be empty" },
        len: { args: [8], msg: "Password must be at least 8 characters" },
      },
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    hooks: {
      beforeValidate: async (user: User) => {
        if (!user.password) {
          return;
        }
        const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10);
        user.passwordHash = await bcrypt.hash(user.password, saltRounds);
        (user as User & { _passwordHashed?: boolean })._passwordHashed = true;
      },
      beforeCreate: async (user: User) => {
        const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10");
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        user.password = hashedPassword;
        console.log("Password hashed in beforeCreate");
      },

      // TODO: Add beforeUpdate hook to hash password if changed
      // Hint: Use user.changed('password') to check if password was modified
      beforeUpdate: async (user: User) => {
        if (user.changed("password")) {
          const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10");
          user.password = await bcrypt.hash(user.password, saltRounds);
          console.log("Password hashed in beforeUpdate");
        }
      },
    },
  },
);

export default User;
