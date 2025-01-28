import express from "express";
import { gridItemController } from "../controllers";
import authMiddleware from "../middlewares/auth.middleware";
const router = express.Router();

router.post("/", authMiddleware, gridItemController.createGridItem);

export default router;
