import express from "express";
import { IRoute } from "../types/others.type";
import dashboardRoutes from "./dashboard.route";

const router = express.Router();

const defaultRoutes: IRoute[] = [
  {
    path: "/dashboard",
    route: dashboardRoutes,
  },
];

// add default routes
defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
