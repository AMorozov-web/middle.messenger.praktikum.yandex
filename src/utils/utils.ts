import {BASE_URL} from '../constants';

/**
 * Функция достает значение из объекта по указанному пути вида 'a.b.c'
 * В случае, если значение не найдено, возвращает значение по умолчанию, если оно передано третьим аргументом
 *
 * @param obj - объект
 * @param path - путь до определенного свойства
 * @param defaultValue - значение по умолчанию
 */

export const get = <T extends Indexed, D>(obj: T, path: string, defaultValue?: D): unknown | D => {
  const pathArr = path.split('.');

  const value = obj[pathArr[0]];

  if (value && typeof value === 'object') {
    const nextPath = pathArr.slice(1).join('.');
    return get(value as Indexed, nextPath, defaultValue);
  }
  return value ?? defaultValue;
};

/**
 * Предикат на тип объекта Record<string, unknown>
 *
 * @param value - определяемое значение
 */

export const isObject = (value: unknown): value is Indexed =>
  Boolean(value) && typeof value === 'object' && !Array.isArray(value);

/**
 * Предикат на тип Function
 *
 * @param value - определяемое значение
 */

export const isFunction = (value: unknown): value is Function =>
  Boolean(value) && typeof value === 'function';

/**
 * Предикат на тип Array
 *
 * @param value - определяемое значение
 */

export const isArray = (value: unknown): value is [] => Boolean(value) && Array.isArray(value);

/**
 * Функция для глубокого копирования объекта или массива
 *
 * @deprecated - переписать реализацию для объектов и массивов
 * @param object - клонируемый объект
 */

export const cloneObject = <T>(object: T): T => {
  if (!object) {
    throw new Error('Object not found');
  }

  return Object.entries(object).reduce((copy, [key, value]) => {
    if (isObject(value)) {
      copy[key] = cloneObject(value);
    } else {
      copy[key] = value;
    }
    return copy;
  }, {} as T);
};

/**
 * Функция для глубокого сравнения двух объектов
 *
 * @param left - первый объект
 * @param right - второй объект
 */

export const isEqual = <T extends Indexed>(left: T, right: T): boolean => {
  const leftKeys = Object.keys(left);
  const rightKeys = Object.keys(right);

  if (leftKeys.length !== rightKeys.length) {
    return false;
  }

  for (const key of leftKeys) {
    const leftValue = left[key];
    const rightValue = right[key];

    const isObjects = isObject(leftValue) && isObject(rightValue);
    const isFunctions = isFunction(leftValue) && isFunction(rightValue);
    const isArrays = Array.isArray(leftValue) && Array.isArray(rightValue);

    if (isObjects && !isEqual(leftValue, rightValue)) {
      return false;
    }

    if (isFunctions && leftValue.toString() !== rightValue.toString()) {
      return false;
    }

    if (isArrays) {
      if (leftValue.length !== rightValue.length) {
        return false;
      }

      for (let i = 0; i < leftValue.length; i++) {
        if (!isEqual(leftValue[i], rightValue[i])) {
          return false;
        }
      }
    }

    if (!isObjects && !isFunctions && !isArrays && leftValue !== rightValue) {
      return false;
    }
  }

  return true;
};

/**
 * Функция объединяет два объекта с сохранением их уникальных ключей
 *
 * @param left - объект
 * @param right - объект
 */

export const mergeObjects = <T extends Indexed>(left: T, right: T): T => {
  if (!right) {
    return left;
  }

  if (isObject(left) && isObject(right)) {
    for (const key in right) {
      if (isObject(right[key])) {
        if (!left[key]) {
          Object.assign(left, {[key]: {}});
        }

        mergeObjects(left[key] as Indexed, right[key] as Indexed);
      } else {
        Object.assign(left, {[key]: right[key]});
      }
    }
  }

  return left;
};

/**
 * Функция получает путь к вложенному свойству объекта и устанавливает значение в это свойство.
 *
 * @param object - объект
 * @param path - путь
 * @param value - значение свойства
 */

export const setValue = <T extends Indexed>(object: T, path: string, value: unknown): T => {
  if (!isObject(object)) {
    return object;
  }

  const splitedPath = path.split('.');

  const objectToSet = splitedPath.reduceRight<Indexed>((prev, curr) => {
    return {
      [curr]: prev,
    };
  }, value as T);

  return mergeObjects<T>(object, objectToSet as T);
};

/**
 * Функцию генерирует query строку у GET-метода
 *
 * @param {object} data объект. Пример: {a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]}
 * @returns строка. Пример: ?a=1&b=2&c=[object Object]&k=1,2,3
 */

export const queryStringify = (data: object) =>
  Object.entries(data).reduce((result, [k, v], i) => {
    if (i === 0) {
      return result.concat(`?${k}=${v.toString()}`);
    }
    return result.concat(`&${k}=${v.toString()}`);
  }, '');

/**
 * Обработчик события onfocus для input
 *
 */

export const onFocus = (evt: Event) => {
  const target = evt.target as HTMLInputElement;

  if (!target.checkValidity()) {
    target.reportValidity();
  }
};

/**
 * Функция удаляет свойство из объекта по ключу
 */

export const omit = <T extends Indexed, K extends keyof T>(object: T, key: K): Omit<T, K> => {
  const copy = {...object};

  delete copy[key];

  return copy;
};

/**
 * Собирает полный путь до загруженного avatar
 */

export const getAvatarUrl = (avatarUrl?: Nullable<string>): string | undefined =>
  avatarUrl ? `${BASE_URL}/resources/${avatarUrl}` : undefined;
