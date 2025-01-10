import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Users } from "../models/index.js";
import sanitizeHtml from "sanitize-html";

// Define the user schema with the zod library
// The schema defines the shape of the data that the user must provide
const userSchema = z.object({
	gender: z.string().length(1),
	userName: z.string(),
	age: z.number().int(),
	email: z.string().email(),
	password: z.string().min(8),
});

// Declare the authController object
const authController = {
	async createUser(req, res) {
		const result = userSchema.safeParse(req.body); // Validate the request body against the user schema

		// If the validation fails, return a 400 status code with the error message
		if (!result.success) {
			return res.status(400).json({ error: result.error });
		}

		const { gender, userName, age, email, password } = result.data; // Destructure the validated request body into individual variables

		const sanitizedUserName = sanitizeHtml(userName);
		const sanitizeAge = sanitizeHtml(age);
		const sanitizedEmail = sanitizeHtml(email);

		const userExists = await Users.findOne({ where: { email } });	// Check if the user already exists in the database

		// If the user already exists, return a 409 status code with the error message
		if (userExists) {
			return res.status(409).json({ message: "User already exists" });
		}

		// Hash the password using bcrypt
		// The saltRounds parameter is the number of rounds used to generate the hash (here 10)
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create a new user object with the validated data and sanitized values
		const userData = {
			gender,
			userName: sanitizedUserName,
			age: sanitizeAge,
			email: sanitizedEmail,
			// Give the password property the hashed password
			password: hashedPassword,
		};

		// Create a new user in the database
		const user = await Users.create(userData);

		// Return a 201 status code with a success message
		return res.status(201).json({ message: "User created successfully" });
	},
	async loginUser(req, res) {
		const { email, password } = req.body; // Destructure the email and password from the request body

		// If the email or password is missing, return a 400 status code with an error message
		if (!email || !password) {
			return res.status(400).json({ error: "Email and password are required" });
		}

		// Find the user in the database by email
		const user = await Users.findOne({
			where: { email },
			attributes: {
				include: ["password"],
			},
		});

		// If the user does not exist, return a 404 status code with an error message
		if (!user) {
			return res
				.status(404)
				.json({ error: "Something went wrong, please try again" });
		}

		const isValidPassword = await bcrypt.compare(password, user.password); // Compare the provided password with the hashed password in the database

		// If the password is invalid, return a 401 status code with an error message
		if (!isValidPassword) {
			return res
				.status(401)
				.json({ error: "Something went wrong, please try again" });
		}

		// Generate an access token using the user's id and the JWT_SECRET from the .env file
		const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
			expiresIn: "10800s",
		});

		// Return the access token in the response
		return res.json({ accessToken, user : { id: user.id, gender: user.gender, userName: user.userName, age: user.age, email: user.email} });
	},
};

export default authController;
