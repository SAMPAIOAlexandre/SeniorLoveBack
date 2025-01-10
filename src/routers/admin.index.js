import { Router } from "express";
import adminAuth from "./adminAuth.router.js";

export const router = Router();

router.use(adminAuth);