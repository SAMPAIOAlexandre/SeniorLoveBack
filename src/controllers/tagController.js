import { Tag } from "../models/index.js";

const tagController = {
	async getAllTags(req, res) {
		const tags = await Tag.findAll();

		res.json(tags);
	},
};

export default tagController;