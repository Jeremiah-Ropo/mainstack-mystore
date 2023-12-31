import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { CustomError } from "../utils/response/custom-error/customError";

import { JWT_SECRET } from "../config";
import { JwtPayload } from "../utils/createJwtToken";

export const checkUserJwt = (req: Request, res: Response, next: NextFunction) => {
  try {
      const token = req.get("Authorization").split(" ")[1];
    if (!token) {
      const customError = new CustomError(400, "General", "Authorization header not provided");
      next(customError);
    }

    let jwtPayload: { [key: string]: any };
    jwtPayload = jwt.verify(token, JWT_SECRET as string) as { [key: string]: any };
    // Remove iat and exp from jwtPayload
    ["iat", "exp"].forEach((keyToRemove) => delete jwtPayload[keyToRemove]);
    req.jwtPayload = jwtPayload as JwtPayload;
    next();
  } catch (error) {
    next(new CustomError(401, "JWT error", error));
  }
};
