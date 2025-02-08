import express from "express";
import { GridItemController } from "../controllers";
import authMiddleware from "../middlewares/auth.middleware";
const router = express.Router();

router.get("/all", authMiddleware, GridItemController.getAllGridItems);
router.post("/", authMiddleware, GridItemController.createGridItem);
router.patch("/:id", authMiddleware, GridItemController.updateAGridItem);
router.delete("/:id", authMiddleware, GridItemController.deleteAGridItem);

export default router;
