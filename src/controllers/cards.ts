/* eslint-disable linebreak-style */
/* eslint-disable function-paren-newline */
/* eslint-disable comma-dangle */
/* eslint-disable consistent-return */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable quotes */

import { Request, Response, NextFunction } from "express";

import Card from "../models/cards";
import {
  MESSAGE_403,
  MESSAGE_404,
  CODE_SUCCESS_RESPONSE,
  ERROR_CODE_ACCESS_DENIED,
  ERROR_CODE_DATA_NOT_FOUND,
} from "../constants";
import { IRequest, IError } from "../types";

export const createCard = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const { name, link } = req.body;
  const userId = req.user?._id;

  return Card.create({ name, link, owner: userId })
    .then((card) => res.status(CODE_SUCCESS_RESPONSE).send({ data: card }))
    .catch((err) => next(err));
};

export const getCards = (req: Request, res: Response, next: NextFunction) =>
  Card.find({})
    .then((cards) => res.status(CODE_SUCCESS_RESPONSE).send({ data: cards }))
    .catch((err) => next(err));

export const deleteCard = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const { cardId } = req.params;
  const userId = req.user?._id;

  const err403: IError = new Error(MESSAGE_403);
  err403.code = ERROR_CODE_ACCESS_DENIED;

  const err404: IError = new Error(MESSAGE_404);
  err404.code = ERROR_CODE_DATA_NOT_FOUND;

  return Card.findById(cardId)
    .orFail(err404)
    .then((cardInformation) => {
      if (cardInformation?.owner.toString() !== userId) {
        throw err403;
      }
      Card.findByIdAndRemove(cardId).then(() =>
        res
          .status(CODE_SUCCESS_RESPONSE)
          .send({ message: `Карточка ${cardId} удалена` })
      );
    })
    .catch((err) => next(err));
};

export const likeCard = (req: IRequest, res: Response, next: NextFunction) => {
  const userId = req.user?._id;

  const { cardId } = req.params;

  const err404: IError = new Error(MESSAGE_404);
  err404.code = ERROR_CODE_DATA_NOT_FOUND;

  return Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .orFail(err404)
    .then((card) => res.status(CODE_SUCCESS_RESPONSE).send({ data: card }))
    .catch((err) => next(err));
};

export const dislikeCard = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?._id;

  const { cardId } = req.params;

  const err404: IError = new Error(MESSAGE_404);
  err404.code = ERROR_CODE_DATA_NOT_FOUND;

  return Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    { new: true }
  )
    .orFail(err404)
    .then((card) => res.status(CODE_SUCCESS_RESPONSE).send({ data: card }))
    .catch((err) => next(err));
};
