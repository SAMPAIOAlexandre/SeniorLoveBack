// multer is a middleware for handling multipart/form-data, which is primarily used for uploading files
// The multer middleware is used to upload files to the server
// The multer middleware is configured with the storage configuration in the utils/storageService.js file
// The storage configuration specifies the destination and filename of the uploaded files
import multer from "./utils/storageService.js";
import { z } from "zod";
import { Users, Tag, Event} from "../models/index.js";
import sanitizeHtml from "sanitize-html";

const meController = {

	async getSelfProfile(req, res) {
		const id = Number.parseInt(req.userId, 10);

		if (Number.isNaN(id)) {
			return res.status(400).json({ error: "Invalid user id" });
		}
		
		const user = await Users.findByPk(id, {
			attributes: {include: ["password"]},
			include: {
				model: Tag,
				as: "tags",
				attributes: ["id", "name"],
				through: {
					attributes: [],
				},
			},
		});

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
		
		const sanitizedUser = {
			id: user.id,
			userName: sanitizeHtml(user.userName),
			email: sanitizeHtml(user.email),
			age: sanitizeHtml(user.age),
			gender: sanitizeHtml(user.gender),
			picture: sanitizeHtml(user.picture),
			hometown: sanitizeHtml(user.hometown),
			bio: sanitizeHtml(user.bio),
			tags: user.tags.map(tag => ({
				id: tag.id,
				name: sanitizeHtml(tag.name),
			})),
		};

		res.json(sanitizedUser);
	},
	async updateSelfProfile(req, res) {
		
		const id = Number.parseInt(req.userId, 10);

		if (Number.isNaN(id)) {
			return res.status(400).json({ error: "Invalid user id" });
		}
		
		const user = await Users.findByPk(id);

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		const { userName, age, picture, hometown, bio } = req.body;

		const sanitizedUserName = userName ? sanitizeHtml(userName) : user.userName;
    const sanitizedPicture = picture ? sanitizeHtml(picture) : user.picture;
    const sanitizedHometown = hometown ? sanitizeHtml(hometown) : user.hometown;
    const sanitizedBio = bio ? sanitizeHtml(bio) : user.bio;
    const parsedAge = age ? Number.parseInt(age, 10) : user.age;


    user.userName = sanitizedUserName;
    user.age = Number.isNaN(parsedAge) ? user.age : parsedAge;
    user.picture = sanitizedPicture;
    user.hometown = sanitizedHometown;
    user.bio = sanitizedBio;

		user.save();

		res.json(user);
	},
	async uploadProfilePicture(req, res) {
		const id = Number.parseInt(req.userId, 10);

		if (Number.isNaN(id)) {
			return res.status(400).json({ error: "Invalid user id" });
		}

		const user = await Users.findByPk(id);

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		// Create an instance of the multer middleware with the storage configuration and the field name "picture" (must match the name attribute in the form)
		// The single method is used to upload a single file
		const upload = multer.single("picture");

		// Call the multer middleware with the request, response, and an error handler
		// The error handler is called if there is an error during the upload
		upload(req, res, (err) => {
			// If there is an error, return a 500 status code with an error message
			if (err) {
				return res.status(500).json({ error: err.message });
			}

			// If there is no file, return a 400 status code with an error message
			if (!req.file) {
				return res.status(400).json({ error: "No file uploaded" });
			}

			// If the file is uploaded successfully, update the user's picture
			// The picture property is updated with the path to the uploaded file
			// The BASE_URL environment variable is used to determine the base URL of the application
			user.picture = `${process.env.BASE_URL}/uploads/${req.file.filename}`;

			user.save();

			res.json(user);
		});
	},
	async deleteSelfProfile(req, res) {
		const id = Number.parseInt(req.userId, 10);

		if (Number.isNaN(id)) {
			return res.status(400).json({ error: "Invalid user id" });
		}

		await Users.destroy({ where: { id } });
		
		res.json({ message: "User deleted" });
	},
	async assignTagToSelfProfile(req, res) {
		const id = Number.parseInt(req.userId, 10);
		const tagId = Number.parseInt(req.params.tagId);

		if (Number.isNaN(id)) {
			return res.status(400).json({ error: "Invalid user id" });
		}

		if (Number.isNaN(tagId)) {
			return res.status(400).json({ error: "Invalid tag id" });
		}

		const tag = await Tag.findByPk(tagId);

		if (!tag) {
			return res.status(404).json({ error: "Tag not found" });
		}

		const user = await Users.findByPk(id, {
			include: {
				model: Tag,
				as: "tags",
				attributes: ["id", "name"],
				through: {
					attributes: [],
				},
			},
		});
		
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		// Check if the tag is already assigned to the user
		// If the tag is already assigned, return a 400 status code with an error message
		// The some method checks if at least one element in the array satisfies the condition
		if (user.tags.some((t) => t.id === tag.id)) {
			return res.status(400).json({ error: "Tag already assigned" });
		}

		// Add the tag to the user using the addTag method
		await user.addTag(tag);

		res.json({ message: "Tag added" });
	},	
	async createAnEvent(req, res) {
		// Define the schema for the request body
		const eventSchema = z.object({
			title: z.string().min(1).optional(false),
			picture: z.string().optional(),
			description: z.string().min(1).optional(false),
			date: z.string().optional(false),
			location: z.string().min(1).optional(false),
		});

		// Validate the request body against the schema
		const { error } = eventSchema.parse(req.body);

		// If the validation fails, return a 400 status code with the error message
		if (error) {
			return res.status(400).json({ error: error.message });
		}

		// Destructure the validated request body into individual variables
		const { title, picture, description, date, location } = req.body;
		// Get the creator ID from the authenticated user
		const creator_id = req.userId;

		const sanitizedTitle = sanitizeHtml(title);
		const sanitizedDescription = sanitizeHtml(description);
		const sanitizedDate = sanitizeHtml(date);
		const sanitizedLocation = sanitizeHtml(location);

		// Create a new event with the validated data
		const event = await Event.create({
			title: sanitizedTitle,
			description: sanitizedDescription,
			date: sanitizedDate,
			location: sanitizedLocation,
			creator_id,
		});

		// Return the created event
		res.json(event);
	},
	async removeTagFromSelfProfile(req, res) {
		const id = Number.parseInt(req.userId, 10);
		const tagId = Number.parseInt(req.params.tagId);

		if (Number.isNaN(id)) {
			return res.status(400).json({ error: "Invalid user id" });
		}

		if (Number.isNaN(tagId)) {
			return res.status(400).json({ error: "Invalid tag id" });
		}

		const tag = await Tag.findByPk(tagId);

		if (!tag) {
			return res.status(404).json({ error: "Tag not found" });
		}

		const user = await Users.findByPk(id, {
			include: {
				model: Tag,
				as: "tags",
				attributes: ["id", "name"],
				through: {
					attributes: [],
				},
			},
		});
		
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		// Check if the tag is assigned to the user
		// If the tag is not assigned, return a 400 status code with an error message
		// The some method checks if at least one element in the array satisfies the condition
		if (!user.tags.some((t) => t.id === tag.id)) {
			return res.status(400).json({ error: "Tag not assigned" });
		}

		// Remove the tag from the user using the removeTag method
		await user.removeTag(tag);

		res.json({ message: "Tag removed" });
	},
	async getSelfCreatedEvents(req, res) {
		const id = Number.parseInt(req.userId, 10);

		if (Number.isNaN(id)) {
			return res.status(400).json({ error: "Invalid user id" });
		}
		
		const events = await Event.findAll({
			where: { creator_id: id },
			include: [
				{
					model: Tag,
					as: "tags",
					attributes: ["id", "name"],
					through: {
						attributes: [],
					},
				},
				{
					model: Users,
					as: "creator",
					attributes: ["id", "userName", "picture"],
				},
			],
		});

		const sanitizedEvents = events.map(event => ({
			id: event.id,
			title: sanitizeHtml(event.title),
			description: sanitizeHtml(event.description),
			location: sanitizeHtml(event.location),
			date: event.date,
			picture: sanitizeHtml(event.picture),
			creator: {
				id: event.creator.id,
				userName: sanitizeHtml(event.creator.userName),
				picture: sanitizeHtml(event.creator.picture),
			},
			tags: event.tags.map(tag => ({
				id: tag.id,
				name: sanitizeHtml(tag.name),
			})),
		}));

		res.json(sanitizedEvents);
	},
	async getOneOwnedEvent(req, res) {
		const id = Number.parseInt(req.userId);
		const eventId = Number.parseInt(req.params.eventId);

		if (Number.isNaN(id)) {
			return res.status(400).json({ error: "Invalid user id" });
		}

		if (Number.isNaN(eventId)) {
			return res.status(400).json({ error: "Invalid event id" });
		}

		const eventToBeFind = await Event.findByPk(eventId, {
			include: [{
				model: Users,
				as: "creator",
				attributes: ["id", "userName", "picture"],
			}, {
				model: Tag,
				as: "tags",
				attributes: ["id", "name"],
				through: {
					attributes: [],
				},
			}],
		});

		if (!eventToBeFind) {
			return res.status(404).json({ error: "Event not found" });
		}

		const sanitizedEvent = {
			id: eventToBeFind.id,
			title: sanitizeHtml(eventToBeFind.title),
			description: sanitizeHtml(eventToBeFind.description),
			location: sanitizeHtml(eventToBeFind.location),
			date: eventToBeFind.date,
			picture: sanitizeHtml(eventToBeFind.picture),
			creator: {
				id: eventToBeFind.creator.id,
				userName: sanitizeHtml(eventToBeFind.creator.userName),
				picture: sanitizeHtml(eventToBeFind.creator.picture),
			},
			tags: eventToBeFind.tags.map(tag => ({
				id: tag.id,
				name: sanitizeHtml(tag.name),
			})),
		};

		res.json(sanitizedEvent);
	},
	async uploadEventPicture(req, res) {
		const id = Number.parseInt(req.userId);
		const eventId = Number.parseInt(req.params.eventId);

		if (Number.isNaN(id)) {
			return res.status(400).json({ error: "Invalid user id" });
		}

		if (Number.isNaN(eventId)) {
			return res.status(400).json({ error: "Invalid event id" });
		}

		const eventToBeFind = await Event.findByPk(eventId, {
			include: {
				model: Users,
				as: "creator",
				attributes: ["id", "userName", "picture"],
			},
		});

		if (!eventToBeFind) {
			return res.status(404).json({ error: "Event not found" });
		}

		const user = await Users.findByPk(id);

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		if (user.id !== eventToBeFind.creator.id) {
			return res.status(403).json({ error: "User is not the creator of the event" });
		}
		
		const upload = multer.single("picture");

		upload(req, res, (err) => {
		if (err) {
				return res.status(500).json({ error: err.message });
			}

		if (!req.file) {
			return res.status(400).json({ error: "No file uploaded" });
		}

		eventToBeFind.picture = `${process.env.BASE_URL}/uploads/${req.file.filename}`;

		eventToBeFind.save();

		res.json({ message: "Event picture uploaded" });
	});
	},
	async updateOwnedEvent(req, res) {
		const id = Number.parseInt(req.userId);
		const eventId = Number.parseInt(req.params.eventId);

		if (Number.isNaN(id)) {
			return res.status(400).json({ error: "Invalid user id" });
		}

		if (Number.isNaN(eventId)) {
			return res.status(400).json({ error: "Invalid event id" });
		}

		const eventToBeFind = await Event.findByPk(eventId, {
			include: {
				model: Users,
				as: "creator",
				attributes: ["id", "userName", "picture"],
			},
		});

		if (!eventToBeFind) {
			return res.status(404).json({ error: "Event not found" });
		}

		const { title, description, date, location, picture } = req.body;

		const sanitizedTitle = title ? sanitizeHtml(title) : eventToBeFind.title;
		const sanitizedDescription = description ? sanitizeHtml(description) : eventToBeFind.description;
		const sanitizedDate = date ? sanitizeHtml(date) : eventToBeFind.date;
		const sanitizedLocation = location ? sanitizeHtml(location) : eventToBeFind.location;
		const sanitizedPicture = picture ? sanitizeHtml(picture) : eventToBeFind.picture;

		eventToBeFind.title = sanitizedTitle;
		eventToBeFind.description = sanitizedDescription;
		eventToBeFind.date = sanitizedDate;
		eventToBeFind.location = sanitizedLocation;
		eventToBeFind.picture = sanitizedPicture;

		await eventToBeFind.save();

		res.json(eventToBeFind);
	},
	async deleteOwnedEvent(req, res) {
		const id = Number.parseInt(req.userId);
		const eventId = Number.parseInt(req.params.eventId);

		if (Number.isNaN(id)) {
			return res.status(400).json({ error: "Invalid user id" });
		}	

		if (Number.isNaN(eventId)) {
			return res.status(400).json({ error: "Invalid event id" });
		}

		const eventToBeFind = await Event.findByPk(eventId, {
			include: {
				model: Users,
				as: "creator",
				attributes: ["id", "userName", "picture"],
			},
		});

		if (!eventToBeFind) {
			return res.status(404).json({ error: "Event not found" });
		}

		const user = await Users.findByPk(id);

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		if (user.id !== eventToBeFind.creator.id) {
			return res.status(403).json({ error: "User is not the creator of the event" });
		}

		await eventToBeFind.destroy();

		res.json(eventToBeFind);
	},
	async addTagToOwnedEvent(req, res) {
		const id = Number.parseInt(req.userId);
		const eventId = Number.parseInt(req.params.eventId);
		const tagId = Number.parseInt(req.params.tagId);

		if (Number.isNaN(id)) {
			return res.status(400).json({ error: "Invalid user id" });
		}

		if (Number.isNaN(eventId)) {
			return res.status(400).json({ error: "Invalid event id" });
		}	

		if (Number.isNaN(tagId)) {
			return res.status(400).json({ error: "Invalid tag id" });
		}

		const eventToBeFind = await Event.findByPk(eventId, {
			include: [{
				model: Users,
				as: "creator",
				attributes: ["id", "userName", "picture"],
			},
			{
				model: Tag,
				as: "tags",
				attributes: ["id", "name"],
				through: {
					attributes: [],
				},
			}],
		});

		if (!eventToBeFind) {
			return res.status(404).json({ error: "Event not found" });
		}

		const user = await Users.findByPk(id);

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		if (user.id !== eventToBeFind.creator.id) {
			return res.status(403).json({ error: "User is not the creator of the event" });
		}

		const tag = await Tag.findByPk(tagId);

		if (!tag) {
			return res.status(404).json({ error: "Tag not found" });
		}

		eventToBeFind.addTag(tag);

		res.json(eventToBeFind);
	},
	async removeTagFromOwnedEvent(req, res) {
		const id = Number.parseInt(req.userId);
		const eventId = Number.parseInt(req.params.eventId);
		const tagId = Number.parseInt(req.params.tagId);

		if (Number.isNaN(id)) {
			return res.status(400).json({ error: "Invalid user id" });
		}

		if (Number.isNaN(eventId)) {
			return res.status(400).json({ error: "Invalid event id" });
		}	

		if (Number.isNaN(tagId)) {
			return res.status(400).json({ error: "Invalid tag id" });
		}

		const eventToBeFind = await Event.findByPk(eventId, {
			include: [{
				model: Users,
				as: "creator",
				attributes: ["id", "userName", "picture"],
			},
			{
				model: Tag,
				as: "tags",
				attributes: ["id", "name", "color"],
				through: {
					attributes: [],
				},
			}],
		});

		if (!eventToBeFind) {
			return res.status(404).json({ error: "Event not found" });
		}

		const user = await Users.findByPk(id);

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		if (user.id !== eventToBeFind.creator.id) {
			return res.status(403).json({ error: "User is not the creator of the event" });
		}

		const tag = await Tag.findByPk(tagId);

		if (!tag) {
			return res.status(404).json({ error: "Tag not found" });
		}

		if (!eventToBeFind.tags.some((t) => t.id === tag.id)) {
			return res.status(400).json({ error: "Tag not assigned" });
		}

		eventToBeFind.removeTag(tag);

		res.json(eventToBeFind);
	},
	async addMeToEvent(req, res) {
		const id = parseInt(req.userId);
		const eventId = Number.parseInt(req.params.eventId);

		if (Number.isNaN(id)) {
			return res.status(400).json({ error: "Invalid user id" });
		}

		if (Number.isNaN(eventId)) {
			return res.status(400).json({ error: "Invalid event id" });
		}	

		const eventToBeFind = await Event.findByPk(eventId, {
			include: [{
				model: Users,
				as: "attendees",
				attributes: ["id", "userName", "picture"],
			}],
		});

		if (!eventToBeFind) {
			return res.status(404).json({ error: "Event not found" });
		}

		const user = await Users.findByPk(id);

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		if (eventToBeFind.attendees.some((u) => u.id === user.id)) {
			return res.status(400).json({ error: "User is already in the event" });
		}

		await eventToBeFind.addAttendee(user);

		await res.json(eventToBeFind);
	},
	async removeMeFromEvent(req, res) {
		const id = parseInt(req.userId);
		const eventId = Number.parseInt(req.params.eventId);

		if (Number.isNaN(id)) {
			return res.status(400).json({ error: "Invalid user id" });
		}

		if (Number.isNaN(eventId)) {
			return res.status(400).json({ error: "Invalid event id" });
		}	

		const eventToBeFind = await Event.findByPk(eventId, {
			include: [{
				model: Users,
				as: "attendees",
				attributes: ["id", "userName", "picture"],
			}],
		});

		if (!eventToBeFind) {
			return res.status(404).json({ error: "Event not found" });
		}

		const user = await Users.findByPk(id);

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		if (!eventToBeFind.attendees.some((u) => u.id === user.id)) {
			return res.status(400).json({ error: "User is not in the event" });
		}

		eventToBeFind.removeAttendee(user);

		res.json(eventToBeFind);
	},
};

export default meController;