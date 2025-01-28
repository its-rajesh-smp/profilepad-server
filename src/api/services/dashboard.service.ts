import prisma from "@/config/prisma.conf";
import { Dashboard, Prisma } from "@prisma/client";

/**
 * Dashboard service
 */
export default class DashboardService {
  /**
   * Find one dashboard
   * @param {Prisma.DashboardFindFirstArgs} conditions Conditions to find the dashboard
   * @returns {Promise<Dashboard | null>} The found dashboard or null if not found
   */
  async findOne(
    conditions: Prisma.DashboardFindFirstArgs
  ): Promise<Dashboard | null> {
    return await prisma.dashboard.findFirst(conditions);
  }

  /**
   * Create a dashboard
   * @param {Prisma.DashboardCreateArgs} data Data to create the dashboard
   * @returns {Promise<Dashboard>} The created dashboard
   */
  async create(data: Prisma.DashboardCreateArgs): Promise<Dashboard> {
    return await prisma.dashboard.create(data);
  }

  /**
   * Update a dashboard
   * @param {Prisma.DashboardWhereUniqueInput} condition Condition to find the dashboard
   * @param {Prisma.DashboardUpdateInput | Prisma.DashboardUncheckedUpdateInput} data Data to update the dashboard
   * @returns {Promise<Dashboard>} The updated dashboard
   */
  async update(
    condition: Prisma.DashboardWhereUniqueInput,
    data: Prisma.DashboardUpdateInput | Prisma.DashboardUncheckedUpdateInput
  ): Promise<Dashboard> {
    return await prisma.dashboard.update({
      where: condition,
      data: data,
    });
  }

  /**
   * Delete a dashboard
   * @param {string} id The id of the dashboard to delete
   * @returns {Promise<Dashboard>} The deleted dashboard
   */
  async delete(id: string): Promise<Dashboard> {
    return await prisma.dashboard.delete({
      where: {
        id: id,
      },
    });
  }
}
