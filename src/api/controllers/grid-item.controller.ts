import { Request, Response } from "express";
import dashboardService from "../services/dashboard.service";
import gridItemService from "../services/grid-item.service";
import { sendErrorResponse, sendResponse } from "../utils";

const createGridItem = async (req: Request, res: Response) => {
  const user = req.user;
  const { newItem, layouts } = req.body;
  const dashboard = await dashboardService.findOne({ userId: user.id });

  if (!dashboard) {
    return sendErrorResponse(res, "Dashboard not found", 404);
  }

  await dashboardService.update({ id: dashboard.id }, { layouts: layouts });
  const gridItem = await gridItemService.create({
    id: newItem.id,
    variant: newItem.variant,
    dashboardId: dashboard.id,
    userId: user.id,
  });

  return sendResponse(res, gridItem);
};

export const getAllGridItems = async (req: Request, res: Response) => {
  const user = req.user;
  const dashboard = await dashboardService.findOne({ userId: user.id });
  if (!dashboard) {
    return sendErrorResponse(res, "Dashboard not found", 404);
  }

  const gridItems = await gridItemService.findAll({
    dashboardId: dashboard.id,
  });

  return sendResponse(res, gridItems);
};

export default { createGridItem, getAllGridItems };
