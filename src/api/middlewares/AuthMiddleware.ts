import { NextFunction, Request, Response } from "express";
import UserService from "../services/User.service";
import { verifyJWTToken } from "../utils/jwt.util";
import { sendErrorResponse } from "../utils/response.util";

const AuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  // If authorization header is not present
  if (!authorization) {
    sendErrorResponse(res, "Unauthorized", 401);
    return;
  }

  const authToken = authorization.split(" ")[1];

  // If token is not present
  if (!authToken) {
    sendErrorResponse(res, "Unauthorized - No token", 401);
    return;
  }

  const decodedData: any = verifyJWTToken(authToken);

  // If token is not valid
  if (!decodedData?.email || !decodedData?.id) {
    sendErrorResponse(res, "Unauthorized - Invalid token", 401);
    return;
  }

  // if user exists
  const user = await UserService.findOne({ id: decodedData.id });
  if (!user) {
    sendErrorResponse(
      res,
      "Unauthorized - User not found with this token",
      401
    );
    return;
  }

  req.user = user as any;
  next();
};

export default AuthMiddleware;
