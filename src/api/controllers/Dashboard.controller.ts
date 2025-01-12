import { Request, Response } from "express";
import {
  defaultDashboardSetting,
  defaultLayoutGroup,
} from "../constants/layout.const";
import { parseGridLayoutConfig } from "../helpers/gridLayoutConfig.helper";
import DashboardService from "../services/Dashboard.service";
import LayoutItemService from "../services/LayoutItem.service";
import UserService from "../services/User.service";
import { sendErrorResponse, sendResponse } from "../utils/response.util";

class DashboardController {
  /**
   * Function to get dashboard preview
   * @param req
   * @param res
   * @returns
   */
  static async getDashboardPreview(req: Request, res: Response) {
    const { slug } = req.params;

    const user = await UserService.findUnique(
      { slug },
      {
        select: {
          headline: true,
          profileImageSrc: true,
          slug: true,
          name: true,
          id: true,
        },
      }
    );

    if (!user) {
      sendErrorResponse(res, "User not found", 404);
      return;
    }

    const dashboard = await DashboardService.findOneWithLayoutItem({
      userId: user.id,
    });

    if (!dashboard) {
      sendErrorResponse(res, "Dashboard not found", 404);
      return;
    }

    const parsedGridLayoutConfig = parseGridLayoutConfig(
      dashboard.gridLayoutConfig
    );

    sendResponse(res, {
      gridLayoutConfig: parsedGridLayoutConfig,
      layoutItems: dashboard.layoutItems,
      user,
    });
  }

  static async getDashboardOrCreate(req: Request, res: Response) {
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
      dashboardSetting: defaultDashboardSetting,
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

    await DashboardService.updateOne(
      { id: dashboard.id },
      {
        gridLayoutConfig: updatedGridLayoutConfig,
      }
    );

    return sendResponse(res, true);
  }

  static async updateDashboardSetting(req: Request, res: Response) {
    const { dashboardSetting } = req.body;
    const { id } = req.user;

    const dashboard = await DashboardService.findOne({
      userId: id,
    });

    if (!dashboard) {
      sendErrorResponse(res, "Dashboard not found", 404);
      return;
    }

    console.log(dashboardSetting);

    await DashboardService.updateOne(
      { id: dashboard.id },
      {
        dashboardSetting,
      }
    );

    return sendResponse(res, true);
  }

  static async resetDashboard(req: Request, res: Response) {
    const { id } = req.user;

    const dashboard = await DashboardService.findOne({
      userId: id,
    });

    if (!dashboard) {
      sendErrorResponse(res, "Dashboard not found", 404);
      return;
    }

    await Promise.all([
      DashboardService.updateOne(
        { id: dashboard.id },
        {
          gridLayoutConfig: defaultLayoutGroup,
        }
      ),
      LayoutItemService.delete({ dashboardId: dashboard.id }),
    ]);

    const updateDashboard = await DashboardService.findOneWithLayoutItem({
      userId: id,
    });

    return sendResponse(res, updateDashboard);
  }
}

export default DashboardController;
