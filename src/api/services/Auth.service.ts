import prisma from "@/config/prisma.conf";

class AuthService {
  static async findById(condition: any = {}) {
    return await prisma.auth.findUnique({ where: condition });
  }

  static async createOne(data: any) {
    return await prisma.auth.create({ data });
  }
}

export default AuthService;
