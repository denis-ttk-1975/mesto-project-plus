/* eslint-disable consistent-return */
/* eslint-disable quotes */
import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";

import { IRequest } from "../types";
import {
  MESSAGE_401_AUTHORIZATION_NEEDED,
  ERROR_CODE_EMAIL_OR_PASSWORD_NOT_FOUND,
} from "../constants";

export default (req: IRequest, res: Response, next: NextFunction) => {
  const authorization = req.headers.cookie;

  console.log("authorization = ", authorization);

  if (!authorization || !authorization.startsWith("jwt=")) {
    return res
      .status(ERROR_CODE_EMAIL_OR_PASSWORD_NOT_FOUND)
      .send({ message: MESSAGE_401_AUTHORIZATION_NEEDED });
  }

  const token = authorization.replace("jwt=", "");
  let payload;

  try {
    payload = jwt.verify(token, "some-secret-key");
  } catch (err) {
    return res
      .status(ERROR_CODE_EMAIL_OR_PASSWORD_NOT_FOUND)
      .send({ message: MESSAGE_401_AUTHORIZATION_NEEDED });
  }

  req.user = payload;

  next();
};
