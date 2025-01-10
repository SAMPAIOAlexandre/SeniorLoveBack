import { Router } from "express";
import { controllerWrapper as cw } from "./controller-wrapper.js";
import authController from "../controllers/authController.js";

const router = Router();

router.post("/signup", cw(authController.createUser));
router.post("/login", cw(authController.loginUser));

export default router;