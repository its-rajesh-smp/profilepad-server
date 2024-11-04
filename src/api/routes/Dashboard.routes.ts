import { Router } from "express";
import DashboardController from "../controllers/Dashboard.controller";
import AuthMiddleware from "../middlewares/AuthMiddleware";

const dashboardRoutes = Router();

// Routes
dashboardRoutes.get("/", AuthMiddleware, DashboardController.getDashboard);

dashboardRoutes.post(
  "/create",
  AuthMiddleware,
  DashboardController.createDashboard
);

dashboardRoutes.patch(
  "/update",
  AuthMiddleware,
  DashboardController.updateDashboard
);

export default dashboardRoutes;
