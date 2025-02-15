import express from "express";

import { UserController } from "../controllers";
import AuthMiddleware from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/fetch", AuthMiddleware, UserController.fetchUser);
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/login/google", UserController.googleLogin);

export default router;
