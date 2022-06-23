export const INPUT_TYPE = {
  EMAIL: 'email',
  PASSWORD: 'password',
  TEL: 'tel',
  TEXT: 'text',
  FILE: 'file',
} as const;

export const BUTTON_TYPE = {
  BUTTON: 'button',
  SUBMIT: 'submit',
} as const;

export const TAG_NAME = {
  A: 'a',
  BUTTON: 'button',
  DIV: 'div',
  FORM: 'form',
  LABEL: 'label',
  UL: 'ul',
  LI: 'li',
} as const;

export const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
} as const;

export const PATTERN = {
  NAME: '[A-ZА-ЯЁ][a-za-яё-]+$',
  LOGIN: '[a-zA-Z][a-zA-Z0-9_-]{3,19}$',
  EMAIL: '[A-Za-z0-9_-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,4}$',
  PASSWORD: '(?=^.{8,40}$)((?=.*\\d)|(?=.*\\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*',
  PHONE: '(\\+)?([\\d]{10,15})$',
} as const;

export const STORE_EVENTS = {
  UPDATED: 'updated',
} as const;

export const WS_EVENTS = {
  MESSAGE: 'MESSAGE',
} as const;

export const BASE_URL = 'https://ya-praktikum.tech/api/v2' as const;

export const WS_BASE_URL = 'wss://ya-praktikum.tech/ws/chats' as const;

export const EMPTY_VALUE_PLACEHOLDER = '-';

export const MONTHS_MAP = {
  1: 'января',
  2: 'февраля',
  3: 'марта',
  4: 'апреля',
  5: 'мая',
  6: 'июня',
  7: 'июля',
  8: 'августа',
  9: 'сентября',
  10: 'октября',
  11: 'ноября',
  12: 'декабря',
} as const;
