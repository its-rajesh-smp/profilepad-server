import { NextFunction, Request, Response } from "express";
import { verifyJWTToken } from "../utils/jwt.util";
import { sendErrorResponse } from "../utils/response.util";
import { UserService } from "../services";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  // If authorization header is not present
  if (!authorization) {
    return sendErrorResponse(res, "Unauthorized", 401);
  }

  const authToken = authorization.split(" ")[1];

  // If token is not present
  if (!authToken) {
    sendErrorResponse(res, "Unauthorized - No token", 401);
    return;
  }

  const decodedData: any = verifyJWTToken(authToken);

  // If token is not valid
  if (!decodedData) {
    sendErrorResponse(res, "Unauthorized - Invalid token", 401);
    return;
  }

  // if user exists
  const user = await UserService.findOne({ id: decodedData });
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

export default authMiddleware;
