/* eslint-disable quotes */
import express from "express";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { errors } from "celebrate";

// import { IRequest } from "./types";
import usersRouter from "./routes/users";
import cardsRouter from "./routes/cards";

import { createUser, login } from "./controllers/users";
import auth from "./middlewares/auth";
import { requestLogger, errorLogger } from "./middlewares/logger";
import errorHandler from "./middlewares/errorHandler";

import { validateCreateUser, validateLogin } from "./validationViaCelebrate";

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

// app.use((req: IRequest, res: Response, next: NextFunction) => {
//   req.user = "63d036d835c09ee215e135ca";

//   next();
// });

app.use(requestLogger);

app.post("/signin", validateLogin, login);
app.post("/signup", validateCreateUser, createUser);

app.use(auth);

app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
