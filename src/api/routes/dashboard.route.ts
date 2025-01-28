import express from "express";
import { dashboardController } from "../controllers";
const router = express.Router();

router.get("/:slug", dashboardController.verifyDashboardSlug);

export default router;
