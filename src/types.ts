/* eslint-disable quotes */
import { Request } from "express";
import { ObjectId } from "mongoose";

export interface IRequest extends Request {
  user?: { _id: ObjectId; iat: any; exp: any };
}

export interface IError extends Error {
  code: Number;
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
