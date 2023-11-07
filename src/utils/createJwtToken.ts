import jwt from "jsonwebtoken";

import { JWT_EXPIRATION, JWT_SECRET } from "../config";

export type JwtPayload = {
  user_id: string;
  email: string;
  created_at?: string;
};

export const createJwtToken = (payload: JwtPayload): string => {
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
  return token;
};
