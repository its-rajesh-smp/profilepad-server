import { Request, Response } from "express";
import {
  loginSchema,
  registerSchema,
  updateUserProfileSchema,
} from "../dtos/User.dto";
import GoogleService from "../services/Google.service";
import UserService from "../services/User.service";
import { compareHash, createHash } from "../utils/bcrypt.util";
import { createJWTToken } from "../utils/jwt.util";
import { sendErrorResponse, sendResponse } from "../utils/response.util";

export default class UserController {
  static async registerUser(req: Request, res: Response) {
    const { data } = registerSchema.parse(req.body);
    const { slug, email, password } = data;

    // Check if slug is already present
    const isSlugOccupied = await UserService.findUnique({ slug });

    if (isSlugOccupied) {
      sendErrorResponse(res, "Slug already exist", 400);
      return;
    }

    // Check if email is available
    const isEmailOccupied = await UserService.findUnique({ email });

    if (isEmailOccupied) {
      sendErrorResponse(res, "Email already exist", 400);
      return;
    }

    // Hash the password
    const hashedPassword = await createHash(password);

    // Create user
    const createdUser = await UserService.createOne({
      ...data,
      password: hashedPassword,
    });

    // Creating auth token
    const authToken = createJWTToken({
      id: createdUser.id,
      email: createdUser.email,
      slug: createdUser.slug,
    });

    const responsePayload = {
      user: createdUser,
      authToken,
    };

    sendResponse(res, responsePayload, 200);
  }

  static async loginUser(req: Request, res: Response) {
    const { data } = loginSchema.parse(req.body);

    const user = await UserService.findUnique({ email: data.email });

    if (!user) {
      sendErrorResponse(res, "User not found", 404);
      return;
    }

    if (!user.password) {
      sendErrorResponse(res, "Please login with Google", 404);
      return;
    }

    const isPasswordMatch = await compareHash(data.password, user.password);

    if (!isPasswordMatch) {
      sendErrorResponse(res, "Invalid password", 400);
      return;
    }

    const authToken = createJWTToken({
      id: user.id,
      email: user.email,
      slug: user.slug,
    });

    const responsePayload = {
      user,
      authToken,
    };

    sendResponse(res, responsePayload, 200);
  }

  static async verifySlug(req: Request, res: Response) {
    const { slug } = req.body;

    const user = await UserService.findUnique({ slug });

    // if slug not occupied
    if (!user) {
      sendResponse(res, { isAvailable: true }, 200);
      return;
    }

    // if slug already exist
    sendResponse(res, { isAvailable: false }, 200);
    return;
  }

  static async verifyUser(req: Request, res: Response) {
    const { user } = req;
    sendResponse(res, { user }, 200);
  }

  static async updateUser(req: Request, res: Response) {
    const { user } = req;

    // Allow only name, headline, profileImageSrc to be updated
    const { data } = updateUserProfileSchema.parse(req.body);

    const updatedUser = await UserService.updateOne({ id: user.id }, data);
    sendResponse(res, { user: updatedUser }, 200);
  }

  static async loginWithGoogle(req: Request, res: Response) {
    const { accessToken, slug } = req.body;

    if (!accessToken) {
      sendErrorResponse(res, "Access token not found", 400);
      return;
    }

    const user = await GoogleService.getUserByAccessToken(accessToken);

    if (!user) {
      sendErrorResponse(res, "Google User not found", 404);
      return;
    }

    const userExists = await UserService.findUnique({ email: user.email });

    // if user already exists
    if (userExists) {
      const authToken = createJWTToken({
        id: userExists.id,
        email: userExists.email,
        slug: userExists.slug,
      });

      sendResponse(res, { user: userExists, authToken }, 200);
      return;
    } else {
      // if user does not exist

      if (!slug) {
        sendErrorResponse(res, "Slug not found", 400);
        return;
      }

      const createdUser = await UserService.createOne({
        name: user.name,
        email: user.email,
        slug: slug,
        profileImageSrc: user.picture,
        authProvider: "google",
      });

      const authToken = createJWTToken({
        id: createdUser.id,
        email: createdUser.email,
        slug: slug,
      });

      sendResponse(res, { user: createdUser, authToken }, 200);
    }
  }
}
