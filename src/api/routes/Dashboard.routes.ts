import { Router } from "express";
import DashboardController from "../controllers/Dashboard.controller";
import AuthMiddleware from "../middlewares/AuthMiddleware";

const dashboardRoutes = Router();

// Routes
dashboardRoutes.get(
  "/",
  AuthMiddleware,
  DashboardController.getDashboardOrCreate
);
dashboardRoutes.get("/preview/:slug", DashboardController.getDashboardPreview);

dashboardRoutes.post(
  "/create",
  AuthMiddleware,
  DashboardController.createDashboard
);

dashboardRoutes.patch(
  "/grid-layout-config/update",
  AuthMiddleware,
  DashboardController.updateDashboard
);

dashboardRoutes.patch(
  "/setting/update",
  AuthMiddleware,
  DashboardController.updateDashboardSetting
);

dashboardRoutes.patch(
  "/reset",
  AuthMiddleware,
  DashboardController.resetDashboard
);

export default dashboardRoutes;
