import { Request, Response } from "express";

class DashboardController {
  static async getDashboardLayout(req: Request, res: Response) {
    res.status(200).send("Dashboard");
  }
}

export default DashboardController;
