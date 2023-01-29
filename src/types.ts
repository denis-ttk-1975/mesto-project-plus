/* eslint-disable quotes */
import { Request } from "express";

export interface IRequest extends Request {
  user?: Record<string, string>;
}
