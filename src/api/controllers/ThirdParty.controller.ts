import { Request, Response } from "express";
import ThirdPartyService from "../services/ThirdParty.service";
import { sendErrorResponse, sendResponse } from "../utils/response.util";

class ThirdPartyController {
  /**
   * Fetches the contribution calendar from GitHub for the given username
   * @param req
   * @param res
   * @returns
   */
  static async fetchGithubData(req: Request, res: Response) {
    const { username } = req.params;
    if (!username) {
      return sendErrorResponse(res, "Github username not found", 400);
    }
    const data = await ThirdPartyService.fetchGithubContributions(username);

    return sendResponse(res, data);
  }
}

export default ThirdPartyController;
