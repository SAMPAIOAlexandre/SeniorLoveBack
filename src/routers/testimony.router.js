import { Router } from "express";
import { controllerWrapper as cw } from "./controller-wrapper.js";
import testimonyController from "../controllers/testimonyController.js";

const router = Router();

router.get("/testimonies", cw(testimonyController.getAllTestimonies));

export default router;