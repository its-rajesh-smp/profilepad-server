import { Router } from "express";
import DashboardRoutes from "./Dashboard.routes";
import LayoutItemRoutes from "./LayoutItem.routes";

// Router
const router = Router();

// Router Mapping
router.use("/dashboard", DashboardRoutes);
router.use("/layout-item", LayoutItemRoutes);

export default router;
