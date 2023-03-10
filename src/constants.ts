/* eslint-disable operator-linebreak */
/* eslint-disable quotes */
export const CODE_SUCCESS_RESPONSE = 200;
export const ERROR_CODE_INCORRECT_RESPONSE_DATA = 400;
export const ERROR_CODE_EMAIL_OR_PASSWORD_NOT_FOUND = 401;
export const ERROR_CODE_ACCESS_DENIED = 403;
export const ERROR_CODE_DATA_NOT_FOUND = 404;
export const ERROR_CODE_USER_ALREADY_EXIST = 409;
export const SERVER_ERROR_CODE = 500;

export const MESSAGE_400 =
  "переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля";
export const MESSAGE_401_USER_NOT_FOUND = "Неправильные почта или пароль";
export const MESSAGE_401_AUTHORIZATION_NEEDED = "Необходима авторизация";
export const MESSAGE_403 = "отказано в доступе";
export const MESSAGE_404 = "карточка или пользователь не найден";
export const MESSAGE_409 = "пользователь уже существует";
export const MESSAGE_500 = "На сервере произошла ошибка";

export const httpRegex =
  // eslint-disable-next-line no-useless-escape
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

export const emailRegex =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
