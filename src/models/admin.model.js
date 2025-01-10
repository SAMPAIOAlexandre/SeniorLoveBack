import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelize-client.js";

export class Admin extends Model {}

Admin.init(
  {
    userName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "admin",
  },
);