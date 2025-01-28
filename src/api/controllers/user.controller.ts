import { Request, Response } from "express";
import { defaultDashboardCreationData } from "../constants/dashboard.const";
import { RegisterUserDto } from "../dtos/user.dto";
import { DashboardService, UserService } from "../services";
import {
  createHash,
  createJWTToken,
  sendErrorResponse,
  sendResponse,
} from "../utils";

/**
 * Registers a new user
 * @param {Request} req - The express request object, containing the user input in the body.
 * @param {Response} res - The express response object used to send back the response.
 * @returns {Promise<void>} - A promise that resolves to void.
 */
const register = async (req: Request, res: Response) => {
  const registerInput = RegisterUserDto.parse(req.body);

  const [isSlugNotExists, isUserExists] = await Promise.all([
    DashboardService.findOne({
      slug: registerInput.dashboardSlug,
    }),
    UserService.findOne({ email: registerInput.email }),
  ]);

  if (isSlugNotExists) {
    return sendErrorResponse(res, "Slug not available", 400);
  }

  if (isUserExists) {
    return sendErrorResponse(res, "User already exists", 400);
  }

  // Generating the hash
  const hashedPassword = await createHash(registerInput.password);

  // Creating the user
  const user = await UserService.create({
    email: registerInput.email,
    password: hashedPassword,
    authProvider: "default",
  });

  // Creating the dashboard
  const dashboard = await DashboardService.create({
    slug: registerInput.dashboardSlug,
    userId: user.id,
    ...defaultDashboardCreationData,
  });

  // Creating the auth token
  const authToken = await createJWTToken(user.id);

  const response = {
    user: { ...user, password: undefined },
    dashboard,
    authToken,
  };

  return sendResponse(res, response);
};

export default { register };
