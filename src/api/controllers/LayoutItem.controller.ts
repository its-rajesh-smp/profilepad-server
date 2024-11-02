import { Request, Response } from "express";
import LayoutItemService from "../services/LayoutItem.service";
import { sendResponse } from "../utils/response.util";

class LayoutItemController {
  static async updateLayoutItem(req: Request, res: Response) {
    const { id } = req.params;
    const { data } = req.body;

    const updatedLayoutItem = await LayoutItemService.updateOne({ id }, data);

    sendResponse(res, updatedLayoutItem);
  }
}

export default LayoutItemController;
