import { Router } from "express";
import LayoutItemController from "../controllers/LayoutItem.controller";

const LayoutItemRoutes = Router();

// Routes
LayoutItemRoutes.patch("/update/:id", LayoutItemController.updateLayoutItem);

export default LayoutItemRoutes;
