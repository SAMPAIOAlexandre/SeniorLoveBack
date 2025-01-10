import { Router } from "express";
import { controllerWrapper as cw } from "./controller-wrapper.js";
import isLoggedIn from "../middlewares/isLoggedIn.js"
import meController from "../controllers/meController.js";
import messageController from "../controllers/messageController.js";

const router = Router();

router.use(isLoggedIn);

router.get("/me", cw(meController.getSelfProfile));
router.patch("/me", cw(meController.updateSelfProfile));
router.delete("/me", cw(meController.deleteSelfProfile));

router.post("/me/profile_picture", cw(meController.uploadProfilePicture));

router.post("/me/tags/:tagId", cw(meController.assignTagToSelfProfile));
router.delete("/me/tags/:tagId", cw(meController.removeTagFromSelfProfile));

router.post("/me/events", cw(meController.createAnEvent));
router.get("/me/events", cw(meController.getSelfCreatedEvents));
router.get("/me/events/:eventId", cw(meController.getOneOwnedEvent));
router.post("/me/events/:eventId/event_picture", cw(meController.uploadEventPicture));
router.patch("/me/events/:eventId", cw(meController.updateOwnedEvent));
router.delete("/me/events/:eventId", cw(meController.deleteOwnedEvent));
router.post("/me/events/:eventId/tags/:tagId", cw(meController.addTagToOwnedEvent));
router.delete("/me/events/:eventId/tags/:tagId", cw(meController.removeTagFromOwnedEvent));

router.post("/me/events/join/:eventId", cw(meController.addMeToEvent));
router.delete("/me/events/join/:eventId", cw(meController.removeMeFromEvent));

router.post("/me/messages/:receiverId", cw(messageController.createMessage));
router.get("/me/messages/:receiverId", cw(messageController.getMessages));
router.get("/me/contacts", cw(messageController.getContacts))
export default router;