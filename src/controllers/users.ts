/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable quotes */
import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt"; // импортируем bcrypt
import jwt from "jsonwebtoken";

import User from "../models/users";
import { IRequest, IUserData } from "../types";
import errorHandler from "../utils";
import { MESSAGE_401, MESSAGE_404, CODE_SUCCESS_RESPONSE } from "../constants";

export const createUser = (req: Request, res: Response) => {
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
    .catch((err) => errorHandler(err, res));

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

export const getUsers = (req: Request, res: Response) =>
  User.find({})
    .then((users) => res.status(CODE_SUCCESS_RESPONSE).send({ data: users }))
    .catch((err) => errorHandler(err, res));

export const getUser = (req: Request, res: Response) => {
  const { _id } = req.params;
  return User.find({ _id: new ObjectId(_id) })
    .orFail(new Error(MESSAGE_404))
    .then((user) => res.status(CODE_SUCCESS_RESPONSE).send({ data: user }))
    .catch((err) => errorHandler(err, res));
};

export const patchUserData = (req: IRequest, res: Response) => {
  const userId = req.user?._id;
  const { name, about } = req.body;

  return User.findByIdAndUpdate(
    userId,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) => res.status(CODE_SUCCESS_RESPONSE).send({ data: user }))
    .catch((err) => errorHandler(err, res));
};

export const patchUserAvatar = (req: IRequest, res: Response) => {
  const userId = req.user?._id;
  const { avatar } = req.body;

  return User.findByIdAndUpdate(
    userId,
    { avatar },
    { new: true, runValidators: true }
  )
    .then((user) => res.status(CODE_SUCCESS_RESPONSE).send({ data: user }))
    .catch((err) => errorHandler(err, res));
};

export const login = (req: IRequest, res: Response) => {
  const { email, password } = req.body;
  let userData: IUserData;
  return User.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error(MESSAGE_401));
      }
      console.log("User exist");
      userData = user;
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        // хеши не совпали — отклоняем промис
        return Promise.reject(new Error(MESSAGE_401));
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
    .catch((err) => errorHandler(err, res));
};
