// sequelize-client.js

// Import necessary dependencies
import "dotenv/config";
import { Sequelize } from "sequelize";

// Create a new Sequelize instance
export const sequelize = new Sequelize(process.env.PG_URL, {
	define: {
		createdAt: "created_at",
		updatedAt: "updated_at",
	},
});

// Test the connection (uncomment line 10 to 21 to test)
// test commande : node src/models/sequelize-client.js

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   })
//   .finally(() => {
//     sequelize.close();
//   })
// ;