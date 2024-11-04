import prisma from "@/config/prisma.conf";

/**
 * Service class for dashboard model
 *
 * @class DashboardService
 */
class DashboardService {
  /**
   * Find one dashboard by condition
   *
   * @param {any} condition - Condition to find dashboard
   * @returns  Found layout or null
   */

  static async findOne(condition: any = {}) {
    return await prisma.dashboard.findUnique({
      where: condition,
    });
  }

  /**
   * Find one dashboard by condition
   *
   * @param {any} condition - Condition to find layout
   * @returns  Found layout or null
   */

  static async findOneWithLayoutItem(condition: any = {}) {
    return await prisma.dashboard.findFirst({
      where: condition,
      include: { layoutItems: true },
    });
  }

  /**
   * Create one dashboard
   *
   * @param {any} data - Data to create
   * @returns Created dashboard
   */
  static async createOne(data: any) {
    return await prisma.dashboard.create({ data });
  }

  /**
   * Update one dashboard by condition
   *
   * @param {any} condition - Condition to find dashboard
   * @param {any} data - Data to update
   * @returns  Updated dashboard
   */
  static async updateOne(condition: any, data: any) {
    return await prisma.dashboard.update({
      where: condition,
      data,
    });
  }

  /**
   * Delete one dashboard by condition
   *
   * @param {any} condition - Condition to find dashboard
   * @returns  Deleted dashboard
   */
  static async deleteOne(condition: any) {
    return await prisma.dashboard.delete({ where: condition });
  }
}

export default DashboardService;
