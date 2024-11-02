import { Request, Response } from "express";
import { defaultLayoutGroup } from "../constants/layout.const";
import LayoutGroupService from "../services/Layout.service";
import LayoutItemService from "../services/LayoutItem.service";
import { sendResponse } from "../utils/response.util";

class DashboardController {
  static async getDashboardLayout(req: Request, res: Response) {
    const layoutGroup = await LayoutGroupService.findOneWithLayoutItem();

    sendResponse(res, layoutGroup);
  }

  static async createDashboardLayout(req: Request, res: Response) {
    const { type } = req.body;

    const createdLayoutGroup = await LayoutGroupService.createOne({
      data: defaultLayoutGroup,
    });

    const createdLayoutItem = await LayoutItemService.createOne({
      type,
      layoutGroupId: createdLayoutGroup.id,
    });

    sendResponse(res, {
      layoutGroup: createdLayoutItem,
      layoutItem: createdLayoutGroup,
    });
  }

  static async updateDashboardLayout(req: Request, res: Response) {
    res.status(200).send("Dashboard");
  }
}

export default DashboardController;
