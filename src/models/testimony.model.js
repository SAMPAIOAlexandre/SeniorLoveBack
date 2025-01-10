import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelize-client.js";

export class Testimony extends Model {}

// Initialize the model with the appropriate configuration (regarding create_tables.sql)
Testimony.init(
	{
		title: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		sequelize,
		tableName: "testimonies",
	},
);