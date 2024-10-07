import {
  Model,
  Sequelize,
  Optional,
  ModelAttributes,
  DataTypes,
} from "sequelize";
import sequelize from "../database/database";

interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
  token?: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

export class User extends Model<ModelAttributes, UserCreationAttributes> {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public readonly created_at!: string;
  public readonly updated_at!: string;
  public readonly token!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "Users",
    sequelize,
    timestamps: true,
  }
);

async () => {
  await sequelize.sync({ force: true });
};

export default User;
