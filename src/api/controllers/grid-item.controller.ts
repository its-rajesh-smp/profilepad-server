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
  await gridItemService.create({
    id: newItem.i,
    variant: newItem.variant,
    dashboardId: dashboard.id,
    userId: user.id,
  });

  return sendResponse(res, true);
};

export default { createGridItem };
