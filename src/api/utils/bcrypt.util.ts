import bcrypt from "bcrypt";
import { getEnv } from "./env.util";

export const createHash = (password: string) =>
  bcrypt.hash(password, +getEnv("BCRYPT_SALT_ROUNDS"));

export const compareHash = (password: string, hash: string) =>
  bcrypt.compare(password, hash);
