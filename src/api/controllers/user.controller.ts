import { Request, Response } from "express";
import { defaultDashboardCreationData } from "../constants/dashboard.const";
import { LoginUserDto, RegisterUserDto } from "../dtos/user.dto";
import { DashboardService, UserService } from "../services";
import {
  compareHash,
  createHash,
  createJWTToken,
  sendErrorResponse,
  sendResponse,
} from "../utils";

/**
 * Fetches the user data
 * @param {Request} _req - The express request object (unused).
 * @param {Response} res - The express response object used to send back the response.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */

const fetchUser = async (_req: Request, res: Response) => {
  return sendResponse(res, true);
};

/**
 * Registers a new user
 * @param {Request} req - The express request object, containing the user input in the body.
 * @param {Response} res - The express response object used to send back the response.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
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
  await DashboardService.create({
    slug: registerInput.dashboardSlug,
    userId: user.id,
    ...defaultDashboardCreationData,
  });

  // Creating the auth token
  const authToken = await createJWTToken(user.id);

  const response = {
    user: { ...user, password: undefined },
    authToken,
  };

  return sendResponse(res, response);
};

/**
 * Logs in a user
 * @param {Request} req - The express request object, containing the user input in the body.
 * @param {Response} res - The express response object used to send back the response.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
const login = async (req: Request, res: Response) => {
  const { email, password } = LoginUserDto.parse(req.body);

  const user = await UserService.findOne({ email });

  if (!user) {
    return sendErrorResponse(res, "User not found", 400);
  }

  if (user.authProvider === "google") {
    return sendErrorResponse(res, "Please login with google", 400);
  }

  const isPasswordValid = await compareHash(password, user.password!);

  if (!isPasswordValid) {
    return sendErrorResponse(res, "Invalid password", 400);
  }

  // Creating the auth token
  const authToken = await createJWTToken(user.id);

  const response = {
    user: { ...user, password: undefined },
    authToken,
  };

  return sendResponse(res, response);
};

export default { register, login, fetchUser };
