import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelize-client.js";

export class Users extends Model {}

// Initialize the model with the appropriate configuration (regarding create_tables.sql)
Users.init(
	{
		userName: {
			type: DataTypes.STRING(255),
			allowNull: false,
			unique: true,
		},
		gender: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		picture: {
			type: DataTypes.STRING,
		},
		role: {
			type: DataTypes.STRING(255),
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
		age: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		hometown: {
			type: DataTypes.STRING(255),
		},
		bio: {
			type: DataTypes.TEXT,
		},
	},
	{
		sequelize,
		tableName: "users",
		defaultScope: {
			attributes: { exclude: ["password"] },
		},
	},
);