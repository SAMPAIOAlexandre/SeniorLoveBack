import { Testimony, Users } from "../models/index.js";
import sanitizeHtml from "sanitize-html";

const testimonyController = {
	getAllTestimonies: async (req, res) => {
		const testimonies = await Testimony.findAll(
			{
				include: {
					model: Users,
					as: "user",
					attributes: ["id", "userName", "picture"],
				},
			}
		);

		testimonies.forEach((testimony) => {
			testimony.content = sanitizeHtml(testimony.content);
		});
		
		res.json(testimonies);
	},
};

export default testimonyController;