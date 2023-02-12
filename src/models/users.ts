/* eslint-disable quotes */
import mongoose from "mongoose";
import validator from "validator";

type User = any;

const userSchema = new mongoose.Schema({
  name: {
    type: String, // имя — это строка
    minlength: 2,
    maxlength: 30,
    default: "Жак-Ив Кусто",
  },
  about: {
    type: String, // about — это строка
    minlength: 2,
    maxlength: 200,
    default: "Исследователь",
  },
  avatar: {
    type: String, // ссылка — это строка
    validate: {
      validator: (v: string) => validator.isURL(v),
      message: "Некорректный URL",
    },
    default:
      "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
  },
  email: {
    type: String,
    validate: {
      validator: (v: string) => validator.isEmail(v),
      message: "Некорректный Email",
    },
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

// TS-интерфейс модели User

export default mongoose.model<User>("user", userSchema);
