/* eslint-disable quotes */
import { Response } from "express";
import {
  ERROR_CODE_UNCORRECT_RESPONSE_DATA,
  SERVER_ERROR_CODE,
  message_400,
  message_500,
} from "./constants";

const errorHandler = (err: Error, res: Response) => {
  if (err.name === "ValidationError" || err.name === "CastError") {
    res
      .status(ERROR_CODE_UNCORRECT_RESPONSE_DATA)
      .send({ message: message_400 });
  } else res.status(SERVER_ERROR_CODE).send({ message: message_500 });
};

export default errorHandler;
