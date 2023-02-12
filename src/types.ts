/* eslint-disable quotes */
import { Request } from "express";
import { ObjectId } from "mongoose";

export interface IRequest extends Request {
  user?: { _id: ObjectId; iat: any; exp: any };
}

export interface IError extends Error {
  code?: number;
}

export interface IUserData {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
  _id: string;
  __v: number;
}
