import { Request, Response } from "express";
import { defaultGridLayoutConfigItem } from "../constants/layout.const";
import { addNewItemToGridLayoutConfig } from "../helpers/gridLayoutConfig.helper";
import DashboardService from "../services/Dashboard.service";
import LayoutItemService from "../services/LayoutItem.service";
import { sendErrorResponse, sendResponse } from "../utils/response.util";

class LayoutItemController {
  static async createLayoutItem(req: Request, res: Response) {
    const { data } = req.body;
    const { id } = req.user;

    const dashboard = await DashboardService.findOne({
      userId: id,
    });

    //  If no dashboard is present
    if (!dashboard) {
      sendErrorResponse(res, "Dashboard not found", 404);
      return;
    }

    console.log(id);

    const layoutItem = await LayoutItemService.createOne({
      ...data,
      userId: id,
      dashboardId: dashboard.id,
    });

    const updatedGridLayoutConfig = addNewItemToGridLayoutConfig(
      dashboard.gridLayoutConfig,
      { ...defaultGridLayoutConfigItem, i: layoutItem.id }
    );

    const updatedDashboard = await DashboardService.updateOne(
      { id: dashboard.id },
      { gridLayoutConfig: updatedGridLayoutConfig }
    );

    sendResponse(res, { layoutItem, updatedDashboard });
  }

  static async updateLayoutItem(req: Request, res: Response) {
    const { id } = req.params;
    const { data } = req.body;

    const updatedLayoutItem = await LayoutItemService.updateOne({ id }, data);
    sendResponse(res, updatedLayoutItem);
  }
}

export default LayoutItemController;
