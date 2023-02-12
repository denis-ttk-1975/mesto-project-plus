/* eslint-disable quotes */
import { Router } from "express";
import {
  validateRefreshAvatar,
  validateRefreshUserInfo,
} from "../validationViaCelebrate";
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
router.patch("/me", validateRefreshUserInfo, patchUserData);
router.patch("/me/avatar", validateRefreshAvatar, patchUserAvatar);

export default router;
