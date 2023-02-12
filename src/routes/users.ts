/* eslint-disable quotes */
import { Router } from "express";
import {
  // createUser,
  getUsers,
  getUser,
  patchUserData,
  patchUserAvatar,
  getCurrentUser,
  // login,
} from "../controllers/users";

const router = Router(); // создали роутер

// router.post("/", createUser);
router.get("/", getUsers);
router.get("/me", getCurrentUser);
router.get("/:_id", getUser);
router.patch("/me", patchUserData);
router.patch("/me/avatar", patchUserAvatar);

export default router;
