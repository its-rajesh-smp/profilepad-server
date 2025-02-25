import { Request, Response } from "express";
import ThirdPartyService from "../services/third-party.service";
import { sendErrorResponse, sendResponse } from "../utils/response.util";

/**
 * Fetches the contribution calendar from GitHub for the given username
 * @param req
 * @param res
 * @returns
 */
async function fetchGithubData(req: Request, res: Response) {
  const { username } = req.params;
  if (!username) {
    return sendErrorResponse(res, "Github username not found", 400);
  }
  const data = await ThirdPartyService.fetchGithubContributions(username);

  return sendResponse(res, data);
}

export default { fetchGithubData };
