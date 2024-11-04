import { Request, Response } from "express";
import { defaultLayoutGroup } from "../constants/layout.const";
import LayoutGroupService from "../services/Dashboard.service";
import { sendResponse } from "../utils/response.util";

class DashboardController {
  static async getDashboard(req: Request, res: Response) {
    const { id } = req.user;

    const layoutGroup = await LayoutGroupService.findOneWithLayoutItem({
      userId: id,
    });

    if (!layoutGroup) {
      DashboardController.createDashboard(req, res);
      return;
    }

    sendResponse(res, layoutGroup);
  }

  static async createDashboard(req: Request, res: Response) {
    const { user } = req;

    const createdLayoutGroup = await LayoutGroupService.createOne({
      data: defaultLayoutGroup,
      userId: user.id,
    });

    sendResponse(res, {
      layoutGroup: createdLayoutGroup,
      layoutItems: [],
    });
  }

  static async updateDashboard(req: Request, res: Response) {
    const { layoutGroup } = req.body;

    const updatedLayoutGroup = await LayoutGroupService.updateOne(
      {},
      {
        data: layoutGroup,
      }
    );

    sendResponse(res, true);
  }
}

export default DashboardController;
