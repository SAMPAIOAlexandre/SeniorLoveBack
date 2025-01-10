import "dotenv/config";
import express from "express";
import cors from "cors";
import session from "express-session";
import { router as apiRouter } from "./src/routers/index.js";
import { router as adminRouter } from "./src/routers/admin.index.js";
import { rateLimit } from 'express-rate-limit'

const app = express(); // Create an express app assigned to 'app' variable

app.disable("x-powered-by"); // Disable the X-Powered-By header

app.set("view engine", "ejs"); // Set the view engine to EJS

app.set("views","views"); // Set the views directory to the views folder

app.use(cors("*")); // Enable CORS

app.use(rateLimit({
	windowMs: 1 * 60 * 1000, // 1 minutes
	max: 200, // Limit each IP to 100 requests per `window` (here, per 10 minutes)
}));

app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

app.use(express.json()); // Parse JSON request bodies

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: { secure: false },
	})
);

app.use(express.static("public")); // Serve static files from the public directory

app.use("/uploads", express.static("./uploads")); // Serve static files from the uploads directory (for profile pictures)

app.get("/", (req, res) => {
	res.render("connexion");
});

// Mount the API router at the /api endpoint
app.use("/admin", adminRouter);
app.use("/api", apiRouter);

const port = process.env.PORT || 3000; // Define the port to listen on

// Start the server on port 3000
app.listen(port, () => {
	console.log(`Server is running on port ${process.env.BASE_URL}`);
});