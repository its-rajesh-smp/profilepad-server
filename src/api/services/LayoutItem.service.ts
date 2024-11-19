import prisma from "../../config/prisma.conf";
/**
 * Service class for LayoutItem model
 *
 * @class LayoutItemService
 */
class LayoutItemService {
  /**
   * Find all layout items
   *
   * @returns Found layout items
   */
  static async findAll() {
    return await prisma.layoutItem.findMany();
  }

  /**
   * Find one layout item by condition
   *
   * @param {any} condition - Condition to find layout item
   * @returns Found layout item
   */
  static async findOne(condition: any) {
    return await prisma.layoutItem.findUnique({ where: condition });
  }

  /**
   * Create one layout item
   *
   * @param {any} data - Data to create
   * @returns Created layout item
   */
  static async createOne(data: any) {
    return await prisma.layoutItem.create({ data });
  }

  /**
   * Update one layout item by condition
   *
   * @param {any} condition - Condition to find layout item
   * @param {any} data - Data to update
   * @returns Updated layout item
   */
  static async updateOne(condition: any, data: any) {
    return await prisma.layoutItem.update({ where: condition, data });
  }

  /**
   * Delete one layout item by condition
   *
   * @param {any} condition - Condition to find layout item
   * @returns Deleted layout item
   */
  static async delete(condition: any) {
    return await prisma.layoutItem.deleteMany({ where: condition });
  }
}

export default LayoutItemService;
