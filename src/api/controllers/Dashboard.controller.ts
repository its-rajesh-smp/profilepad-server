import { Request, Response } from "express";
import { defaultLayoutGroup } from "../constants/layout.const";
import DashboardService from "../services/Dashboard.service";
import { sendErrorResponse, sendResponse } from "../utils/response.util";
import UserService from "../services/User.service";
import LayoutItemService from "../services/LayoutItem.service";

class DashboardController {
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

    sendResponse(res, {
      gridLayoutConfig: dashboard.gridLayoutConfig,
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

    sendResponse(res, true);
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

    sendResponse(res, updateDashboard);
  }
}

export default DashboardController;
