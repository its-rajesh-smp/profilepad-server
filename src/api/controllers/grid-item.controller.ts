import { Request, Response } from "express";
import { removeItemFromGrid } from "../helpers/grid.helper";
import { ThirdPartyService } from "../services";
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

/**
 * Updates a grid item by uploading a file to cloudinary and updating the field to update with the url of the uploaded file
 * @param {Request} req - The express request object
 * @param {Response} res - The express response object
 * @param {string} id - The id of the grid item to update
 * @param {string} fieldToUpdate - The field to update in the grid item
 * @returns {Promise<void>} - A promise that resolves when the response is sent
 */
const uploadFileAndUpdateGridItem = async (req: Request, res: Response) => {
  const user = req.user;
  const { id, fieldToUpdate } = req.params;
  const files: any = req.files;
  const file = files[0];

  if (!fieldToUpdate) {
    return sendErrorResponse(res, "Field to update not provided", 400);
  }

  if (!file) {
    return sendErrorResponse(res, "File not found", 400);
  }

  if (!id) {
    return sendErrorResponse(res, "Id not provided", 400);
  }

  // Get the grid item
  const gridItem = await gridItemService.findOne({ id, userId: user.id });

  if (!gridItem) {
    return sendErrorResponse(res, "Grid item not found", 404);
  }

  // Update the original name of the file
  file.originalname = `${gridItem.id}-${fieldToUpdate}`;

  // Upload the image to cloudinary and get the url
  const uploadedFile = await ThirdPartyService.uploadFileToCloudinary(
    file,
    `${user.email}/${gridItem.dashboardId}`
  );

  if (!uploadedFile) {
    return sendErrorResponse(res, "Error uploading file", 500);
  }

  // Update the grid item
  const updatedGridItem = await gridItemService.update(
    { id: gridItem.id, userId: user.id },
    {
      metadata: {
        ...((gridItem?.metadata as any) || {}),
        [fieldToUpdate]: uploadedFile.url,
      },
    }
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
  uploadFileAndUpdateGridItem,
};
