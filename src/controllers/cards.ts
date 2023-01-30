/* eslint-disable comma-dangle */
/* eslint-disable consistent-return */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable quotes */

import { Request, Response } from "express";

import Card from "../models/cards";
import errorHandler from "../utils";
import { ERROR_CODE_UNCORRECT_RESPONSE_DATA, MESSAGE_404, CODE_SUCCESS_RESPONSE } from "../constants";

interface IRequest extends Request {
  user?: Record<string, string>;
}

export const createCard = (req: IRequest, res: Response) => {
  const { name, link } = req.body;
  const userId = req.user?._id;

  return Card.create({ name, link, owner: userId })
    .then((card) => res.status(CODE_SUCCESS_RESPONSE).send({ data: card }))
    .catch((err) => errorHandler(err, res));
};

export const getCards = (req: Request, res: Response) =>
  Card.find({})
    .then((cards) => res.status(CODE_SUCCESS_RESPONSE).send({ data: cards }))
    .catch((err) => errorHandler(err, res));

export const deleteCard = (req: Request, res: Response) => {
  const { cardId } = req.params;

  Card.findById(cardId).then((card) => {
    if (!card) {
      return res
        .status(ERROR_CODE_UNCORRECT_RESPONSE_DATA)
        .send({ message: MESSAGE_404 });
    }
  });

  return Card.findByIdAndRemove(cardId)
    .then(() => res.status(CODE_SUCCESS_RESPONSE).send({ message: `Карточка ${cardId} удалена` }))
    .catch((err) => errorHandler(err, res));
};

export const likeCard = (req: IRequest, res: Response) => {
  const userId = req.user?._id;

  const { cardId } = req.params;

  Card.findById(cardId).then((card) => {
    if (!card) {
      return res
        .status(ERROR_CODE_UNCORRECT_RESPONSE_DATA)
        .send({ message: MESSAGE_404 });
    }
  });

  return Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .then((card) => res.status(CODE_SUCCESS_RESPONSE).send({ data: card }))
    .catch((err) => errorHandler(err, res));
};

export const dislikeCard = (req: IRequest, res: Response) => {
  const userId = req.user?._id;

  const { cardId } = req.params;

  Card.findById(cardId).then((card) => {
    if (!card) {
      return res
        .status(ERROR_CODE_UNCORRECT_RESPONSE_DATA)
        .send({ message: MESSAGE_404 });
    }
  });

  return Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    { new: true }
  )
    .then((card) => res.status(CODE_SUCCESS_RESPONSE).send({ data: card }))
    .catch((err) => errorHandler(err, res));
};
