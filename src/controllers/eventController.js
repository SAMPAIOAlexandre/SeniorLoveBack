import { Event, Tag, Users } from "../models/index.js";
import sanitizeHtml from "sanitize-html";

const eventController = {
	async getAllEvents(req, res) {
		const events = await Event.findAll({
			// We want to retrieve the tags associated with the events
			include: [
				{
					model: Tag, // Specify the model to use
					as: "tags", // Specify the alias to use (refer to the association in the models)
					attributes: ["id", "name", "color"], // Specify the attributes to retrieve from the Tag model
					// Define the attributes to retrieve from the intermediate model (e.g. events_tags)
					// Not doing this will return all attributes from the intermediate model by default and we want to exclude them
					through: {
						// In this case, we don't need any attributes from the intermediate model, so we exclude them using an empty array
						attributes: [],
					},
				},
				// Include the event creator
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
				color: sanitizeHtml(tag.color),
			})),
		}));

		res.json(sanitizedEvents);
	},
	async getOneEvent(req, res) {
		const id = Number.parseInt(req.params.id); // Get the event ID from the URL

		if (Number.isNaN(id)) {
			return res.status(400).json({ error: "Invalid event ID" });
		}

		const event = await Event.findByPk(id, {
			include: [
				{
					model: Tag,
					as: "tags",
					attributes: ["id", "name", "color"],
					through: {
						attributes: [],
					},
				},
				{
					model: Users,
					as: "attendees",
					attributes: ["id", "userName", "picture"],
					through: {
						attributes: [],
					},
				},
				{
					model: Users,
					as: "creator",
					attributes: ["id", "userName", "picture"],
				}
			],
		});

		if (!event) {
			return res.status(404).json({ error: "Event not found" });
		}

		const sanitizedEvent = {
			id: event.id,
			title: sanitizeHtml(event.title),
			description: sanitizeHtml(event.description),
			location: sanitizeHtml(event.location),
			date: sanitizeHtml(event.date),
			picture: sanitizeHtml(event.picture),
			tags: event.tags.map(tag => ({
				id: tag.id,
				name: sanitizeHtml(tag.name),
				color: sanitizeHtml(tag.color),
			})),
			attendees: event.attendees.map(attendee => ({
				id: attendee.id,
				userName: sanitizeHtml(attendee.userName),
				picture: sanitizeHtml(attendee.picture),
			})),
			creator: {
				id: event.creator.id,
				userName: sanitizeHtml(event.creator.userName),
				picture: sanitizeHtml(event.creator.picture),
			},
		};

		res.json(sanitizedEvent);
	},
};

export default eventController;