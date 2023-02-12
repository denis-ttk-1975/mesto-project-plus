/* eslint-disable comma-dangle */
/* eslint-disable quotes */
import { Response, NextFunction } from "express";
import { IRequest, IError } from "../types";
import { SERVER_ERROR_CODE, MESSAGE_500 } from "../constants";

const errorHandler = (
  err: IError,
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const { code = 500, message } = err;
  res.status(code).send({
    message: code === SERVER_ERROR_CODE ? MESSAGE_500 : message,
  });
  next();
};

export default errorHandler;
