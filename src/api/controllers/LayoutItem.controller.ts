import { Request, Response } from "express";
import { defaultGridLayoutConfigItem } from "../constants/layout.const";
import {
  addNewItemToGridLayoutConfig,
  deleteItemFromGridLayoutConfig,
} from "../helpers/gridLayoutConfig.helper";
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

    const layoutItem = await LayoutItemService.createOne({
      ...data,
      userId: id,
      dashboardId: dashboard.id,
    });

    const updatedGridLayoutConfig = addNewItemToGridLayoutConfig(
      dashboard.gridLayoutConfig,
      layoutItem.id,
      { type: data.type }
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

  static async deleteLayoutItem(req: Request, res: Response) {
    const user = req.user;
    const { id: itemId } = req.params;
    const dashboard = await DashboardService.findOne({ userId: user.id });

    if (!dashboard) {
      sendErrorResponse(res, "Dashboard not found", 404);
      return;
    }

    const updatedGridLayoutConfig = deleteItemFromGridLayoutConfig(
      dashboard.gridLayoutConfig,
      itemId
    );

    await Promise.all([
      LayoutItemService.delete({ id: itemId }),
      DashboardService.updateOne(
        { id: dashboard.id },
        { gridLayoutConfig: updatedGridLayoutConfig }
      ),
    ]);

    const updatedDashboard = await DashboardService.findOneWithLayoutItem({
      userId: user.id,
    });

    sendResponse(res, updatedDashboard);
  }
}

export default LayoutItemController;
