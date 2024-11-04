import prisma from "@/config/prisma.conf";

class UserService {
  static async findById(condition: any = {}) {
    return await prisma.user.findUnique({ where: condition });
  }

  static async findUnique(condition: any = {}) {
    return await prisma.user.findUnique({ where: condition });
  }

  static async createOne(data: any) {
    return await prisma.user.create({ data });
  }
}

export default UserService;
