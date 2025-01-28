import express from "express";
import userController from "../controllers/user.controller";
import AuthMiddleware from "../middlewares/AuthMiddleware";

const router = express.Router();

router.get("/fetch", AuthMiddleware, userController.fetchUser);
router.post("/register", userController.register);
router.post("/login", userController.login);

export default router;
