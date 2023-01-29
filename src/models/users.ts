import mongoose from 'mongoose';

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
    required: true, // ссылка — обязательное поле
  },
});

// TS-интерфейс модели User

export default mongoose.model<User>('user', userSchema);
