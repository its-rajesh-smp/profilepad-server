import { Router } from "express";
import DashboardController from "../controllers/Dashboard.controller";

const DashboardRoutes = Router();

// Routes
DashboardRoutes.get("/layout", DashboardController.getDashboardLayout);

DashboardRoutes.post(
  "/layout/create",
  DashboardController.createDashboardLayout
);

DashboardRoutes.patch(
  "/layout/update/:id",
  DashboardController.updateDashboardLayout
);

export default DashboardRoutes;
