import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

import usersRouter from "./routes/users";
import cardsRouter from "./routes/cards";

export interface IRequest extends Request {
  user?: Record<string, string>;
}

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

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
  console.log(`App listening on port ${PORT}`);
});
