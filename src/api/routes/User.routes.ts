import { Router } from "express";
import UserController from "../controllers/User.controller";
import AuthMiddleware from "../middlewares/AuthMiddleware";

// Router
const UserRoutes = Router();

UserRoutes.post("/register", UserController.registerUser);
UserRoutes.get("/verify", AuthMiddleware, UserController.verifyUser);
UserRoutes.post("/verify-slug", UserController.verifySlug);

export default UserRoutes;
