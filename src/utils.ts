/* eslint-disable linebreak-style */
/* eslint-disable quotes */
import { Response } from "express";
import {
  ERROR_CODE_UNCORRECT_RESPONSE_DATA,
  SERVER_ERROR_CODE,
  MESSAGE_400,
  MESSAGE_500,
  MESSAGE_404,
  ERROR_CODE_DATA_NOT_FOUND,
} from "./constants";

const errorHandler = (err: Error, res: Response) => {
  if (err.message === MESSAGE_404) {
    res.status(ERROR_CODE_DATA_NOT_FOUND).send({ message: MESSAGE_404 });
  } else if (err.name === "ValidationError" || err.name === "CastError") {
    res
      .status(ERROR_CODE_UNCORRECT_RESPONSE_DATA)
      .send({ message: MESSAGE_400 });
  } else res.status(SERVER_ERROR_CODE).send({ message: MESSAGE_500 });
};

export default errorHandler;
