import { Request, Response } from "express";
import DashboardService from "../services/dashboard.service";
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

export default { checkDashboardSlugAvailability };
