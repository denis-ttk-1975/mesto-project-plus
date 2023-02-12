/* eslint-disable quotes */
import { Router } from "express";
import { validateCard } from "../validationViaCelebrate";
import {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
} from "../controllers/cards";

const router = Router(); // создали роутер

router.post("/", validateCard, createCard);
router.get("/", getCards);
router.delete("/:cardId", deleteCard);
router.put("/:cardId/likes", likeCard);
router.delete("/:cardId/likes", dislikeCard);

export default router;
