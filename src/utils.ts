/* eslint-disable linebreak-style */
/* eslint-disable quotes */
import { Response } from "express";
import { IError } from "./types";
import {
  ERROR_CODE_INCORRECT_RESPONSE_DATA,
  ERROR_CODE_EMAIL_OR_PASSWORD_NOT_FOUND,
  ERROR_CODE_ACCESS_DENIED,
  SERVER_ERROR_CODE,
  ERROR_CODE_DATA_NOT_FOUND,
  ERROR_CODE_USER_ALREADY_EXIST,
  MESSAGE_400,
  MESSAGE_401_USER_NOT_FOUND,
  MESSAGE_403,
  MESSAGE_404,
  MESSAGE_409,
  MESSAGE_500,
} from "./constants";

const errorHandler = (err: IError, res: Response) => {
  if (err.message === MESSAGE_404) {
    res.status(ERROR_CODE_DATA_NOT_FOUND).send({ message: MESSAGE_404 });
  } else if (err.message === MESSAGE_401_USER_NOT_FOUND) {
    res
      .status(ERROR_CODE_EMAIL_OR_PASSWORD_NOT_FOUND)
      .send({ message: MESSAGE_401_USER_NOT_FOUND });
  } else if (err.message === MESSAGE_403) {
    res.status(ERROR_CODE_ACCESS_DENIED).send({ message: MESSAGE_403 });
  } else if (err.name === "ValidationError" || err.name === "CastError") {
    res
      .status(ERROR_CODE_INCORRECT_RESPONSE_DATA)
      .send({ message: MESSAGE_400 });
  } else if (err?.code === 11000) {
    res.status(ERROR_CODE_USER_ALREADY_EXIST).send({ message: MESSAGE_409 });
  } else res.status(SERVER_ERROR_CODE).send({ message: MESSAGE_500 });
};

export default errorHandler;
