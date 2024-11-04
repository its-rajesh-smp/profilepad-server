import { Request, Response } from "express";
import { defaultLayoutGroup, defaultLayoutId } from "../constants/layout.const";
import LayoutGroupService from "../services/Layout.service";
import LayoutItemService from "../services/LayoutItem.service";
import { sendResponse } from "../utils/response.util";

class DashboardController {
  static async getDashboardLayout(req: Request, res: Response) {
    const layoutGroup = await LayoutGroupService.findOneWithLayoutItem();
    sendResponse(res, layoutGroup);
  }

  static async createDashboardLayout(req: Request, res: Response) {
    const { data } = req.body;

    // const createdLayoutGroup = await LayoutGroupService.createOne({
    //   data: defaultLayoutGroup,
    // });
    const createdLayoutGroup = await LayoutGroupService.findOne({
      id: defaultLayoutId,
    });

    const createdLayoutItem = await LayoutItemService.createOne({
      ...data,
      layoutGroupId: defaultLayoutId,
    });

    sendResponse(res, {
      layoutGroup: createdLayoutGroup,
      layoutItem: createdLayoutItem,
    });
  }

  static async updateDashboardLayout(req: Request, res: Response) {
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
