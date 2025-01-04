import { Router } from "express";
import ThirdPartyController from "../controllers/ThirdParty.controller";
import AuthMiddleware from "../middlewares/AuthMiddleware";

// Router
const ThirdPartyRoutes = Router();

ThirdPartyRoutes.get(
  "/github/:username",
  AuthMiddleware,
  ThirdPartyController.fetchGithubData
);

export default ThirdPartyRoutes;
