import { Router } from "express";
import { controllerWrapper as cw } from "./controller-wrapper.js";
import usersController from "../controllers/usersController.js";

const router = Router();

router.get("/users", cw(usersController.getAllUsers));
router.get("/users/:id", cw(usersController.getOneUser));

export default router;