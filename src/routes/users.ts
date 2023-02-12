/* eslint-disable quotes */
import { Router } from "express";
import {
  getUsers,
  getUser,
  patchUserData,
  patchUserAvatar,
  getCurrentUser,
} from "../controllers/users";

const router = Router(); // создали роутер

router.get("/", getUsers);
router.get("/me", getCurrentUser);
router.get("/:_id", getUser);
router.patch("/me", patchUserData);
router.patch("/me/avatar", patchUserAvatar);

export default router;
