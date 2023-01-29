import { Request, Response } from "express";
import { ObjectId } from "mongodb";

import User from "./../models/users";
import { IRequest } from "./../app";
import errorHandler from "./../utils";
import {
  ERROR_CODE_UNCORRECT_RESPONSE_DATA,
  message_404,
} from "./../constants";

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;

  return User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => errorHandler(err, res));
};

export const getUsers = (req: Request, res: Response) => {
  return User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => errorHandler(err, res));
};

export const getUser = (req: Request, res: Response) => {
  const { _id } = req.params;
  return User.find({ _id: new ObjectId(_id) })
    .then((user) => {
      if (!user.length) {
        res
          .status(ERROR_CODE_UNCORRECT_RESPONSE_DATA)
          .send({ message: message_404 });
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => errorHandler(err, res));
};

export const patchUserData = (req: IRequest, res: Response) => {
  const userId = req.user?._id;
  const { name, about } = req.body;

  return User.findByIdAndUpdate(userId, { name, about })
    .then((user) => res.send({ data: user }))
    .catch((err) => errorHandler(err, res));
};

export const patchUserAvatar = (req: IRequest, res: Response) => {
  const userId = req.user?._id;
  const { avatar } = req.body;

  return User.findByIdAndUpdate(userId, { avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => errorHandler(err, res));
};
