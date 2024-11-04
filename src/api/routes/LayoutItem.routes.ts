import { Router } from "express";
import LayoutItemController from "../controllers/LayoutItem.controller";
import AuthMiddleware from "../middlewares/AuthMiddleware";

const LayoutItemRoutes = Router();

// Routes
LayoutItemRoutes.post(
  "/create",
  AuthMiddleware,
  LayoutItemController.createLayoutItem
);
LayoutItemRoutes.patch(
  "/update/:id",
  AuthMiddleware,
  LayoutItemController.updateLayoutItem
);

export default LayoutItemRoutes;
