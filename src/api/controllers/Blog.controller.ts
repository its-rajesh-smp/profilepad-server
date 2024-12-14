import { Request, Response } from "express";
import BlogService from "../services/Blog.service";
import { sendResponse } from "../utils/response.util";

export default class BlogController {
  static async getAllBlogs(req: Request, res: Response) {
    const allBlogs = await BlogService.findAll({});

    sendResponse(res, allBlogs);
    return;
  }

  static getABlog(req: Request, res: Response) {
    const { id } = req.params;
    const blog = BlogService.findById({ id });

    if (!blog) {
      sendResponse(res, "Blog not found");
      return;
    }

    sendResponse(res, blog);
    return;
  }

  static async createABlog(req: Request, res: Response) {
    const { id } = req.user;
    const blog = await BlogService.createOne({
      title: "New Blog",
      userId: id,
    });

    sendResponse(res, blog);
    return;
  }

  static async updateABlog(req: Request, res: Response) {
    const { id } = req.params;
    const { data } = req.body;
    const { id: userId } = req.user;

    const existingBlog = await BlogService.findById({ id, userId });

    if (!existingBlog) {
      sendResponse(res, "Blog not found");
      return;
    }

    const blog = await BlogService.updateOne({ id }, data);

    sendResponse(res, blog);
    return;
  }

  static async deleteABlog(req: Request, res: Response) {
    const { id } = req.params;
    const { id: userId } = req.user;
    const existingBlog = await BlogService.findById({ id, userId });
    console.log(existingBlog);

    if (!existingBlog) {
      sendResponse(res, "Blog not found");
      return;
    }

    await BlogService.deleteOne({ id });

    sendResponse(res, true);
  }
}
