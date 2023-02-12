/* eslint-disable consistent-return */
/* eslint-disable function-paren-newline */
/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable quotes */
import { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt"; // импортируем bcrypt
import jwt from "jsonwebtoken";

import User from "../models/users";
import { IRequest, IUserData, IError } from "../types";
import {
  MESSAGE_401_USER_NOT_FOUND,
  MESSAGE_404,
  CODE_SUCCESS_RESPONSE,
  MESSAGE_401_AUTHORIZATION_NEEDED,
  ERROR_CODE_EMAIL_OR_PASSWORD_NOT_FOUND,
  ERROR_CODE_DATA_NOT_FOUND,
} from "../constants";

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar, email, password } = req.body;

  return bcrypt
    .hash(password, 10)
    .then((hash: String) =>
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash, // записываем хеш в базу
      })
    )
    .then((user) => res.status(CODE_SUCCESS_RESPONSE).send({ data: user }))
    .catch((err) => next(err));

  // return User.create({
  //   name,
  //   about,
  //   avatar,
  //   email,
  //   password,
  // })
  //   .then((user) => res.status(CODE_SUCCESS_RESPONSE).send({ data: user }))
  //   .catch((err) => errorHandler(err, res));
};

export const getUsers = (req: Request, res: Response, next: NextFunction) =>
  User.find({})
    .then((users) => res.status(CODE_SUCCESS_RESPONSE).send({ data: users }))
    .catch((err) => next(err));

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.params;
  const err: IError = new Error(MESSAGE_404);
  err.code = ERROR_CODE_DATA_NOT_FOUND;

  return User.find({ _id: new ObjectId(_id) })
    .orFail(new Error(MESSAGE_404))
    .then((user) => res.status(CODE_SUCCESS_RESPONSE).send({ data: user }))
    .catch(() => next(err));
};

export const patchUserData = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user;
  const { name, about } = req.body;

  return User.findByIdAndUpdate(
    userId,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) => res.status(CODE_SUCCESS_RESPONSE).send({ data: user }))
    .catch((err) => next(err));
};

export const patchUserAvatar = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user;
  const { avatar } = req.body;

  return User.findByIdAndUpdate(
    userId,
    { avatar },
    { new: true, runValidators: true }
  )
    .then((user) => res.status(CODE_SUCCESS_RESPONSE).send({ data: user }))
    .catch((err) => next(err));
};

export const login = (req: IRequest, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  let userData: IUserData;
  const err: IError = new Error(MESSAGE_401_USER_NOT_FOUND);
  err.code = ERROR_CODE_EMAIL_OR_PASSWORD_NOT_FOUND;

  return User.findOne({ email })
    .select("+password")
    .orFail(err)
    .then((user) => {
      console.log("User exist");
      userData = user;
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        // хеши не совпали — отклоняем промис
        return Promise.reject(err);
      }

      // аутентификация успешна
      const token = jwt.sign({ _id: userData._id }, "some-secret-key", {
        expiresIn: "7d",
      });

      // вернём токен
      res
        .status(CODE_SUCCESS_RESPONSE)
        .cookie("jwt", token, {
          httpOnly: true,
        })
        .end();
    })
    .catch(() => next(err));
};

export const getCurrentUser = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  console.log("req.user: ", req.user);
  const _id = req.user?._id;
  const err: IError = new Error(MESSAGE_401_AUTHORIZATION_NEEDED);
  err.code = ERROR_CODE_EMAIL_OR_PASSWORD_NOT_FOUND;

  return User.findById(_id)
    .orFail(err)
    .then((user) => res.status(CODE_SUCCESS_RESPONSE).send({ data: user }))
    .catch(() => next(err));
};
