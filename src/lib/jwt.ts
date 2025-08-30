import { TJwtPayload } from "@/types/auth.types";
import jwt, { SignOptions } from "jsonwebtoken";

export const generateToken = (
  jwtPayload: TJwtPayload,
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(jwtPayload, secret, { expiresIn } as SignOptions);
};

export const verifyToken = (token: string, secret: string) => {
  try {
    return jwt.verify(token, secret) as TJwtPayload;
  } catch {
    return null;
  }
};
