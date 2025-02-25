import express from "express";

import { ThirdPartyController } from "../controllers";
import AuthMiddleware from "../middlewares/auth.middleware";

const router = express.Router();

router.get(
  "/github/:username",
  AuthMiddleware,
  ThirdPartyController.fetchGithubData
);

export default router;
