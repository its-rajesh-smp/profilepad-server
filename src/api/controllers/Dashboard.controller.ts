import { Request, Response } from "express";
import { defaultLayoutGroup } from "../constants/layout.const";
import DashboardService from "../services/Dashboard.service";
import { sendErrorResponse, sendResponse } from "../utils/response.util";

class DashboardController {
  static async getDashboard(req: Request, res: Response) {
    const { id } = req.user;

    const dashboard = await DashboardService.findOneWithLayoutItem({
      userId: id,
    });

    if (!dashboard) {
      DashboardController.createDashboard(req, res);
      return;
    }

    sendResponse(res, dashboard);
  }

  static async createDashboard(req: Request, res: Response) {
    const { user } = req;

    const dashboard = await DashboardService.createOne({
      gridLayoutConfig: defaultLayoutGroup,
      userId: user.id,
    });

    sendResponse(res, { ...dashboard, layoutItems: [] });
  }

  static async updateDashboard(req: Request, res: Response) {
    const { updatedGridLayoutConfig } = req.body;
    const { id } = req.user;

    const dashboard = await DashboardService.findOne({
      userId: id,
    });

    if (!dashboard) {
      sendErrorResponse(res, "Dashboard not found", 404);
      return;
    }

    const updatedLayoutGroup = await DashboardService.updateOne(
      { id: dashboard.id },
      {
        gridLayoutConfig: updatedGridLayoutConfig,
      }
    );

    sendResponse(res, true);
  }
}

export default DashboardController;
