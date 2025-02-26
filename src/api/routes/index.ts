import express from "express";
import { IRoute } from "../types/others.type";
import dashboardRoutes from "./dashboard.route";
import gridItemRoutes from "./grid-item.route";
import userRoutes from "./user.route";
import thirdPartyRoutes from "./third-party.route";

const router = express.Router();

const defaultRoutes: IRoute[] = [
  {
    path: "/dashboard",
    route: dashboardRoutes,
  },
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/grid-item",
    route: gridItemRoutes,
  },
  {
    path: "/third-party",
    route: thirdPartyRoutes,
  },
];

// add default routes
defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
