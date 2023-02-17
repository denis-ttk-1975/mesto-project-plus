/* eslint-disable consistent-return */
/* eslint-disable quotes */
import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { ObjectId } from "mongoose";
import dotenv from "dotenv";

import { IRequest, IError } from "../types";
import {
  MESSAGE_401_AUTHORIZATION_NEEDED,
  ERROR_CODE_EMAIL_OR_PASSWORD_NOT_FOUND,
} from "../constants";

dotenv.config({ path: "./config.env" });
const { JWT_SECRET_KEY = "some-secret-key" } = process.env;

export default (req: IRequest, res: Response, next: NextFunction) => {
  const authorization = req.headers.cookie;

  if (!authorization || !authorization.startsWith("jwt=")) {
    return res
      .status(ERROR_CODE_EMAIL_OR_PASSWORD_NOT_FOUND)
      .send({ message: MESSAGE_401_AUTHORIZATION_NEEDED });
  }

  const token = authorization.replace("jwt=", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET_KEY);
  } catch (e) {
    const err: IError = new Error(MESSAGE_401_AUTHORIZATION_NEEDED);
    err.code = ERROR_CODE_EMAIL_OR_PASSWORD_NOT_FOUND;

    next(err);
  }

  req.user = payload as { _id: ObjectId; iat: any; exp: any };

  next();
};
