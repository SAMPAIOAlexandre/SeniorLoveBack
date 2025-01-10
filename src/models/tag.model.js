import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelize-client.js";

export class Tag extends Model {}

// Initialize the model with the appropriate configuration (regarding create_tables.sql)
Tag.init(
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		color: {
			type: DataTypes.STRING(6),
			allowNull: false,
		},
	},
	{
		sequelize,
		tableName: "tag",
	},
);