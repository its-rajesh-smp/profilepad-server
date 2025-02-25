import prisma from "@/config/prisma.conf";
import { Prisma } from "@prisma/client";

export const create = async (gridItem: any) => {
  return await prisma.layoutItem.create({ data: gridItem });
};

export const findAll = async (condition: any) => {
  return await prisma.layoutItem.findMany({ where: condition });
};

export const findOne = async (condition: any) => {
  return await prisma.layoutItem.findUnique({ where: condition });
};

export const update = async (
  condition: any,
  data: Prisma.LayoutItemUpdateInput
) => {
  return await prisma.layoutItem.update({ where: condition, data });
};

export const deleteItem = async (condition: any) => {
  return await prisma.layoutItem.delete({ where: condition });
};

export default { create, findAll, findOne, update, deleteItem };
