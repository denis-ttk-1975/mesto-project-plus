/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable quotes */
import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt"; // импортируем bcrypt

import User from "../models/users";
import { IRequest } from "../types";
import errorHandler from "../utils";
import { MESSAGE_404, CODE_SUCCESS_RESPONSE } from "../constants";

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
