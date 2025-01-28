import express from "express";
import { dashboardController } from "../controllers";
import authMiddleware from "../middlewares/auth.middleware";
const router = express.Router();

router.get("/", authMiddleware, dashboardController.getUserDashboard);
router.get(
  "/:slug/availability",
  dashboardController.checkDashboardSlugAvailability
);
router.patch("/", authMiddleware, dashboardController.updateUserDashboard);

export default router;
