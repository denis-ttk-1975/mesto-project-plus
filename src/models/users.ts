/* eslint-disable quotes */
import mongoose from "mongoose";
import validator from "validator";

type User = any;

const userSchema = new mongoose.Schema({
  name: {
    type: String, // имя — это строка
    required: true, // имя — обязательное поле
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String, // about — это строка
    required: true, // about — обязательное поле
    minlength: 2,
    maxlength: 200,
  },
  avatar: {
    type: String, // ссылка — это строка
    validate: {
      validator: (v: string) => validator.isURL(v),
      message: "Некорректный URL",
    },
    required: true, // ссылка — обязательное поле
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
  },
});

// TS-интерфейс модели User

export default mongoose.model<User>("user", userSchema);
