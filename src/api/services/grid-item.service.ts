import prisma from "@/config/prisma.conf";
import { Prisma } from "@prisma/client";

export const create = async (gridItem: any) => {
  return await prisma.layoutItem.create({ data: gridItem });
};

export const findAllByDashboardId = async (dashboardId: string) => {
  return await prisma.layoutItem.findMany({ where: { dashboardId } });
};

export const findOne = async (id: string) => {
  return await prisma.layoutItem.findUnique({ where: { id } });
};

export const update = async (
  id: string,
  data: Prisma.LayoutItemUpdateInput
) => {
  return await prisma.layoutItem.update({ where: { id }, data });
};

export const deleteItem = async (id: string) => {
  return await prisma.layoutItem.delete({ where: { id } });
};

export default { create, findAllByDashboardId, findOne, update, deleteItem };
