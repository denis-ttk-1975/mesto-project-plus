import mongoose from "mongoose";

type Card = any;

const cardSchema = new mongoose.Schema({
  name: {
    type: String, // имя — это строка
    required: true, // имя — обязательное поле
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String, // ссылка — это строка
    required: true, // ссылка — обязательное поле
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  likes: [
    {
      // описываем схему для одного элемента и заключаем её в квадратные скобки
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      default: [],
    },
  ],
  createdAt: {
    type: Date, // дата - это дата
    default: Date.now,
  },
});

// TS-интерфейс модели Card

export default mongoose.model<Card>("card", cardSchema);
