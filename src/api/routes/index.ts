import express from "express";
import { IRoute } from "../types/others.type";
import dashboardRoutes from "./dashboard.route";
import userRoutes from "./user.route";

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
];

// add default routes
defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
