import { Request, Response } from "express";
import { DashboardService, GridItemService } from "../services";
import dashboardService from "../services/dashboard.service";
import { sendErrorResponse, sendResponse } from "../utils/response.util";

/**
 * check the availability of the dashboard slug
 * @param {Request} req - The express request object, containing the slug in the params.
 * @param {Response} res - The express response object used to send back the availability.
 */
const checkDashboardSlugAvailability = async (req: Request, res: Response) => {
  const { slug } = req.params;

  if (!slug) {
    return sendErrorResponse(res, "Slug not provided", 400);
  }

  let isSlugAvailable = await DashboardService.findOne({
    slug,
  });

  return sendResponse(res, { isAvailable: !isSlugAvailable });
};

/**
 * Get the user's dashboard
 * @param {Request} req - The express request object, containing the slug in the params.
 * @param {Response} res - The express response object used to send back the dashboard.
 * @throws {Error} If the slug is not provided.
 * @throws {Error} If the dashboard is not found.
 */
const getUserDashboard = async (req: Request, res: Response) => {
  const slug = req.params.slug;
  const user = req.user;

  let dashboard = null;

  if (slug) {
    dashboard = await DashboardService.findOne({ slug });
  } else {
    dashboard = await DashboardService.findOne({ userId: user.id });
  }

  if (!dashboard) {
    return sendErrorResponse(res, "Dashboard not found", 404);
  }

  const gridItems = await GridItemService.findAll({
    dashboardId: dashboard.id,
  });

  if (!dashboard) {
    return sendErrorResponse(res, "Dashboard not found", 404);
  }

  return sendResponse(res, { dashboard, gridItems });
};

const updateUserDashboard = async (req: Request, res: Response) => {
  const user = req.user;
  const dashboard = await dashboardService.findOne({ userId: user.id });

  if (!dashboard) {
    return sendErrorResponse(res, "Dashboard not found", 404);
  }

  await dashboardService.update(
    { id: dashboard.id },
    { layouts: req.body.layouts }
  );

  return sendResponse(res, true);
};

export default {
  checkDashboardSlugAvailability,
  getUserDashboard,
  updateUserDashboard,
};
