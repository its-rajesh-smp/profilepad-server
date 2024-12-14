import { Router } from "express";
import blogRouter from "./Blog.routes";
import dashboardRoutes from "./Dashboard.routes";
import layoutItemRoutes from "./LayoutItem.routes";
import userRoutes from "./User.routes";

// Router
const router = Router();

// Router Mapping
router.use("/user", userRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/layout-item", layoutItemRoutes);
router.use("/blog", blogRouter);

export default router;
