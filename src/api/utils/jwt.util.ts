import jwt from "jsonwebtoken";
import { getEnv } from "./env.util";

export const createJWTToken = (payload: any) =>
  jwt.sign(payload, getEnv("JWT_SECRET"));

export const verifyJWTToken = (token: string) =>
  jwt.verify(token, getEnv("JWT_SECRET"));
