import { Request, Response } from "express";

import Card from "../models/cards";
import errorHandler from "./../utils";
import {
  ERROR_CODE_UNCORRECT_RESPONSE_DATA,
  message_404,
} from "./../constants";

interface IRequest extends Request {
  user?: Record<string, string>;
}

export const createCard = (req: IRequest, res: Response) => {
  const { name, link } = req.body;
  const userId = req.user?._id;

  return Card.create({ name, link, owner: userId })
    .then((card) => res.send({ data: card }))
    .catch((err) => errorHandler(err, res));
};

export const getCards = (req: Request, res: Response) => {
  return Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => errorHandler(err, res));
};

export const deleteCard = (req: Request, res: Response) => {
  const { cardId } = req.params;

  Card.findById(cardId).then((card) => {
    if (!card) {
      return res
        .status(ERROR_CODE_UNCORRECT_RESPONSE_DATA)
        .send({ message: message_404 });
    }
  });

  return Card.findByIdAndRemove(cardId)
    .then(() => res.send({ message: `Карточка ${cardId} удалена` }))
    .catch((err) => errorHandler(err, res));
};

export const likeCard = (req: IRequest, res: Response) => {
  const userId = req.user?._id;

  const { cardId } = req.params;

  Card.findById(cardId).then((card) => {
    if (!card) {
      return res
        .status(ERROR_CODE_UNCORRECT_RESPONSE_DATA)
        .send({ message: message_404 });
    }
  });

  return Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => errorHandler(err, res));
};

export const dislikeCard = (req: IRequest, res: Response) => {
  const userId = req.user?._id;

  const { cardId } = req.params;

  Card.findById(cardId).then((card) => {
    if (!card) {
      return res
        .status(ERROR_CODE_UNCORRECT_RESPONSE_DATA)
        .send({ message: message_404 });
    }
  });

  return Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } }, // убрать _id из массива
    { new: true }
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => errorHandler(err, res));
};
