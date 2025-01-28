import { Request, Response } from "express";
import { sendResponse } from "../utils/response.util";

/**
 * Verifies the dashboard slug
 * @param {Request} req - The express request object, containing the slug in the params.
 * @param {Response} res - The express response object used to send back the slug.
 */
const verifyDashboardSlug = async (req: Request, res: Response) => {
  const { slug } = req.params;
  return sendResponse(res, { slug });
};

export default { verifyDashboardSlug };
