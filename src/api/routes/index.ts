import express from "express";
import dashboardRoutes from "./dashboard.route";

const router = express.Router();

const defaultRoutes = [
  {
    path: "/dashboard",
    route: dashboardRoutes,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
