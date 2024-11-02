import prisma from "@/config/prisma.conf";

/**
 * Service class for layoutGroup model
 *
 * @class LayoutGroupService
 */
class LayoutGroupService {
  /**
   * Find one layoutGroup by condition
   *
   * @param {any} condition - Condition to find layout
   * @returns  Found layout or null
   */

  static async findOne(condition: any = {}) {
    return await prisma.layoutGroup.findUnique({ where: condition });
  }

  /**
   * Find one layoutGroup by condition
   *
   * @param {any} condition - Condition to find layout
   * @returns  Found layout or null
   */

  static async findOneWithLayoutItem(condition: any = {}) {
    return await prisma.layoutGroup.findFirst({
      where: { id: "8dd5ce5c-df22-4d70-9c6a-e9a3f2956fda" },
      include: { LayoutItem: true },
    });
  }

  /**
   * Create one layoutGroup
   *
   * @param {any} data - Data to create
   * @returns Created layoutGroup
   */
  static async createOne(data: any) {
    return await prisma.layoutGroup.create({ data });
  }

  /**
   * Update one layoutGroup by condition
   *
   * @param {any} condition - Condition to find layoutGroup
   * @param {any} data - Data to update
   * @returns  Updated layoutGroup
   */
  static async updateOne(condition: any, data: any) {
    return await prisma.layoutGroup.update({ where: condition, data });
  }

  /**
   * Delete one layoutGroup by condition
   *
   * @param {any} condition - Condition to find layoutGroup
   * @returns  Deleted layoutGroup
   */
  static async deleteOne(condition: any) {
    return await prisma.layoutGroup.delete({ where: condition });
  }
}

export default LayoutGroupService;
