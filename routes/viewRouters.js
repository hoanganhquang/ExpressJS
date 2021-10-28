import { Router } from "express";
const router = Router();

import { login, getTour, getOverview } from "../controllers/viewController.js";
import { isLoggedIn, protect } from "../controllers/authController.js";

router.use(isLoggedIn);

router.get("/login", login);

router.get("/tour/:slug", protect, getTour);

router.get("/", getOverview);

export default router;
