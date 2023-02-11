/* eslint-disable linebreak-style */
/* eslint-disable quotes */
import { Response } from "express";
import {
  ERROR_CODE_INCORRECT_RESPONSE_DATA,
  ERROR_CODE_EMAIL_OR_PASSWORD_NOT_FOUND,
  SERVER_ERROR_CODE,
  ERROR_CODE_DATA_NOT_FOUND,
  MESSAGE_400,
  MESSAGE_401,
  MESSAGE_404,
  MESSAGE_500,
} from "./constants";

const errorHandler = (err: Error, res: Response) => {
  if (err.message === MESSAGE_404) {
    res.status(ERROR_CODE_DATA_NOT_FOUND).send({ message: MESSAGE_404 });
  } else if (err.message === MESSAGE_401) {
    res
      .status(ERROR_CODE_EMAIL_OR_PASSWORD_NOT_FOUND)
      .send({ message: MESSAGE_401 });
  } else if (err.name === "ValidationError" || err.name === "CastError") {
    res
      .status(ERROR_CODE_INCORRECT_RESPONSE_DATA)
      .send({ message: MESSAGE_400 });
  } else res.status(SERVER_ERROR_CODE).send({ message: MESSAGE_500 });
};

export default errorHandler;
