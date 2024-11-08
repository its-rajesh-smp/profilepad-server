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
LayoutItemRoutes.delete(
  "/delete/:id",
  AuthMiddleware,
  LayoutItemController.deleteLayoutItem
);

export default LayoutItemRoutes;
