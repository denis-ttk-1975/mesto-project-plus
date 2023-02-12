/* eslint-disable quotes */
import { celebrate, Joi } from "celebrate";

import { httpRegex, emailRegex } from "./constants";

export const validateCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(emailRegex),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(httpRegex),
    about: Joi.string().min(2).max(30),
  }),
});

export const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(emailRegex),
    password: Joi.string().required(),
  }),
});

export const validateRefreshAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(httpRegex),
  }),
});

export const validateRefreshUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

export const validateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().pattern(httpRegex),
  }),
});
