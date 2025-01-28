import express from "express";
import { dashboardController } from "../controllers";
const router = express.Router();

router.get(
  "/:slug/availability",
  dashboardController.checkDashboardSlugAvailability
);

export default router;
