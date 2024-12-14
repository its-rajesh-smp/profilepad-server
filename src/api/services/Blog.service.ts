import prisma from "../../config/prisma.conf";

class BlogService {
  static async findAll(condition: any = {}) {
    return await prisma.blog.findMany({ where: condition });
  }

  static async findById(condition: any = {}) {
    return await prisma.blog.findUnique({ where: condition });
  }

  static async findUnique(condition: any = {}, options: any = {}) {
    return await prisma.blog.findUnique({
      where: condition,
      ...options,
    });
  }

  static async createOne(data: any) {
    return await prisma.blog.create({ data });
  }

  static async updateOne(condition: any, data: any) {
    return await prisma.blog.update({ where: condition, data });
  }

  static async deleteOne(condition: any) {
    return await prisma.blog.delete({ where: condition });
  }
}

export default BlogService;
