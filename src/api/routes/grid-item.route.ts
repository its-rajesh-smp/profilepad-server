import express from "express";
import { gridItemController } from "../controllers";
import authMiddleware from "../middlewares/auth.middleware";
const router = express.Router();

router.get("/all", authMiddleware, gridItemController.getAllGridItems);
router.post("/", authMiddleware, gridItemController.createGridItem);
router.patch("/:id", authMiddleware, gridItemController.updateAGridItem);
router.delete("/:id", authMiddleware, gridItemController.deleteAGridItem);

export default router;
