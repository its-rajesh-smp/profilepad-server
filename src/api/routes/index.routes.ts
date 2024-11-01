import { Router } from "express";
import DashboardRoutes from "./Dashboard.routes";

// Router
const router = Router();

// Router Mapping
router.use("/dashboard", DashboardRoutes);

export default router;
