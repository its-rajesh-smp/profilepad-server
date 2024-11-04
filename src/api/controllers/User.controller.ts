import { Request, Response } from "express";
import UserService from "../services/User.service";
import { sendErrorResponse, sendResponse } from "../utils/response.util";
import { registerSchema } from "../dtos/User.dto";
import { createHash } from "../utils/bcrypt.util";
import { createJWTToken } from "../utils/jwt.util";

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
}
