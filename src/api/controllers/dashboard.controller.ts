import { Request, Response } from "express";
import { sendResponse } from "../utils/response.util";

const verifyDashboardSlug = async (req: Request, res: Response) => {
  const { slug } = req.params;
  return sendResponse(res, { slug });
};

export default { verifyDashboardSlug };
