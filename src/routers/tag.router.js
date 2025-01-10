import { Router } from "express";
import { controllerWrapper as cw } from "./controller-wrapper.js";
import tagController from "../controllers/tagController.js";

const router = Router();

router.get("/tags", cw(tagController.getAllTags));

export default router;