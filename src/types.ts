/* eslint-disable quotes */
import { Request } from "express";

export interface IRequest extends Request {
  user?: Record<string, string>;
}

export interface IUserData {
  name: String;
  about: String;
  avatar: String;
  email: String;
  password: String;
  _id: String;
  __v: Number;
}
