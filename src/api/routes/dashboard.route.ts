import express from "express";
import { DashboardController } from "../controllers";
import authMiddleware from "../middlewares/auth.middleware";
const router = express.Router();

router.get("/", authMiddleware, DashboardController.getUserDashboard);
router.get(
  "/:slug/availability",
  DashboardController.checkDashboardSlugAvailability
);
router.patch("/", authMiddleware, DashboardController.updateUserDashboard);

export default router;
