import jwt from "jsonwebtoken";

import { JWT_EXPIRATION, JWT_SECRET } from "../config";

export type JwtPayload = {
  user_id: string;
  email: string;
  created_at?: string;
};

export const createJwtToken = (payload: JwtPayload, expiresIn?): string => {
  const access_token = jwt.sign(payload, JWT_SECRET as string, {
    expiresIn: expiresIn || (JWT_EXPIRATION as string | number),
  });
  return access_token;
};
