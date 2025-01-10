import { Router } from "express";
import { controllerWrapper as cw } from "./controller-wrapper.js";
import adminAuthController from "../controllers/adminAuthController.js";
import adminController from "../controllers/adminController.js";
import authenticateAdmin from "../middlewares/authenticateAdmin.js";

const router = Router();

router.post("/login", cw(adminAuthController.loginAdmin));
router.post("/logout", cw(adminAuthController.logoutAdmin));

router.use(authenticateAdmin);

router.post("/signup", cw(adminAuthController.registerAdmin));

router.get("/dashboard", cw(adminController.renderDashboard));

router.get("/users", cw(adminController.getAllUsers));
router.get("/users/:id", cw(adminController.getOneUser));
router.delete("/users/:id", cw(adminController.deleteOneUser));

router.get("/events", cw(adminController.getAllEvents));
router.get("/events/:id", cw(adminController.getOneEvent));
router.delete("/events/:id", cw(adminController.deleteOneEvent));

router.get("/admins", cw(adminController.getAllAdmins));
router.delete("/admins/:id", cw(adminController.deleteOneAdmin));

export default router;
