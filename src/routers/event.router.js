import { Router } from "express";
import { controllerWrapper as cw } from "./controller-wrapper.js";
import eventController from "../controllers/eventController.js";

const router = Router();

router.get("/events", cw(eventController.getAllEvents));
router.get("/events/:id", cw(eventController.getOneEvent));

export default router;