/* eslint-disable quotes */
import express, { Response, NextFunction } from "express";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

import { IRequest } from "./types";
import usersRouter from "./routes/users";
import cardsRouter from "./routes/cards";

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply the rate limiting middleware to all requests
app.use(limiter);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/mestodb");

app.use((req: IRequest, res: Response, next: NextFunction) => {
  req.user = {
    _id: "63d036d835c09ee215e135ca",
  };

  next();
});

app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  // console.log(`App listening on port ${PORT}`);
});
