import { Router } from "express";
import UserController from "../controllers/User.controller";
import AuthMiddleware from "../middlewares/AuthMiddleware";

// Router
const UserRoutes = Router();

UserRoutes.post("/register", UserController.registerUser);
UserRoutes.post("/login", UserController.loginUser);
UserRoutes.get("/verify", AuthMiddleware, UserController.verifyUser);
UserRoutes.post("/verify-slug", UserController.verifySlug);
UserRoutes.patch("/update/profile", AuthMiddleware, UserController.updateUser);

export default UserRoutes;
