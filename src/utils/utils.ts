/**
 * Функция достает значение из объекта по указанному пути вида 'a.b.c'
 * В случае, если значение не найдено, возвращает значение по умолчанию, если оно передано третьим аргументом
 *
 * @param obj - объект
 * @param path - путь до определенного свойства
 * @param defaultValue - значение по умолчанию
 */

export const get = <T extends Record<string, unknown>, D>(
  obj: T,
  path: string,
  defaultValue?: D,
): unknown | D => {
  const pathArr = path.split('.');

  const value = obj[pathArr[0]];

  if (value && typeof value === 'object') {
    const nextPath = pathArr.slice(1).join('.');
    return get(value as Record<string, unknown>, nextPath, defaultValue);
  }
  return value ?? defaultValue;
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
 * Предикат на тип объекта Record<string, unknown>
 *
 * @param value - определяемый объект
 */

export const isObject = (value: unknown): value is object =>
  Boolean(value) && typeof value === 'object' && !Array.isArray(value);

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
