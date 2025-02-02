import { Request, Response } from "express";
import dashboardService from "../services/dashboard.service";
import gridItemService from "../services/grid-item.service";
import { sendErrorResponse, sendResponse } from "../utils";
import { removeItemFromGrid } from "../helpers/grid.helper";

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

const getAllGridItems = async (req: Request, res: Response) => {
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

const updateAGridItem = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return sendErrorResponse(res, "Id not provided", 400);
  }

  const user = req.user;

  const gridItem = await gridItemService.findOne({ id, userId: user.id });

  if (!gridItem) {
    return sendErrorResponse(res, "Grid item not found", 404);
  }

  const updatedGridItem = await gridItemService.update(
    { id: gridItem.id, userId: user.id },
    req.body
  );

  return sendResponse(res, updatedGridItem);
};

const deleteAGridItem = async (req: Request, res: Response) => {
  const user = req.user;
  const { id } = req.params;

  if (!id) {
    return sendErrorResponse(res, "Id not provided", 400);
  }

  const gridItem = await gridItemService.findOne({ id, userId: user.id });
  const dashboard = await dashboardService.findOne({ userId: user.id });

  if (!dashboard) {
    return sendErrorResponse(res, "Dashboard not found", 404);
  }

  if (!gridItem) {
    return sendErrorResponse(res, "Grid item not found", 404);
  }

  await gridItemService.deleteItem({ id: gridItem.id, userId: user.id });
  const updatedGridLayout = removeItemFromGrid(dashboard.layouts, gridItem.id);

  const updatedDashboard = await dashboardService.update(
    { id: dashboard.id },
    { layouts: updatedGridLayout }
  );

  return sendResponse(res, updatedDashboard);
};

export default {
  createGridItem,
  getAllGridItems,
  updateAGridItem,
  deleteAGridItem,
};
