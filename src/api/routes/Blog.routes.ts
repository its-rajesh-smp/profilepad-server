import { Router } from "express";
import BlogController from "../controllers/Blog.controller";
import AuthMiddleware from "../middlewares/AuthMiddleware";

// Router
const blogRoutes = Router();

// Routes
blogRoutes.get("/all", AuthMiddleware, BlogController.getAllBlogs);
blogRoutes.get("/:id", BlogController.getABlog);
blogRoutes.post("/create", AuthMiddleware, BlogController.createABlog);
blogRoutes.patch("/update/:id", AuthMiddleware, BlogController.updateABlog);
blogRoutes.delete("/delete/:id", AuthMiddleware, BlogController.deleteABlog);

export default blogRoutes;
