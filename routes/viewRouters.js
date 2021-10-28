import { Router } from "express";
const router = Router();

import {
  login,
  getTour,
  getOverview,
  getAccount,
  updateUserDate,
} from "../controllers/viewController.js";
import { isLoggedIn, protect } from "../controllers/authController.js";

router.get("/login", isLoggedIn, login);

router.get("/tour/:slug", isLoggedIn, getTour);

router.get("/me", protect, getAccount);

router.post("/submit-user-data", protect, updateUserDate);

router.get("/", isLoggedIn, getOverview);

export default router;
