import { Router } from "express";
import DashboardController from "../controllers/Dashboard.controller";

const DashboardRoutes = Router();

// Routes
DashboardRoutes.get("/", DashboardController.getDashboardLayout);

export default DashboardRoutes;
