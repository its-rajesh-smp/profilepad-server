import bcrypt from "bcrypt";
import { getEnv } from "./env.util";

export const createHash = (password: string) => {
  const SALT_ROUNDS = getEnv("BCRYPT_SALT_ROUNDS") || 10;
  return bcrypt.hash(password, Number(SALT_ROUNDS));
};

export const compareHash = (password: string, hash: string) =>
  bcrypt.compare(password, hash);
