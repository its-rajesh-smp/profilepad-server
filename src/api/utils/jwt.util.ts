import jwt from "jsonwebtoken";
import { getEnv } from "./env.util";

export const createJWTToken = (payload: any) => {
  const JWT_SECRET = getEnv("JWT_SECRET") || "secret";
  return jwt.sign(payload, JWT_SECRET);
};

export const verifyJWTToken = (token: string) => {
  const JWT_SECRET = getEnv("JWT_SECRET") || "secret";
  return jwt.verify(token, JWT_SECRET);
};
