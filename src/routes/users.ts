import { Router } from "express";
import {
  createUser,
  getUsers,
  getUser,
  patchUserData,
  patchUserAvatar,
} from "../controllers/users";

const router = Router(); // создали роутер

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:_id", getUser);
router.patch("/me", patchUserData);
router.patch("/me/avatar", patchUserAvatar);

export default router;
