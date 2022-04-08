/**
 * Функция достает значение из объекта по указанному пути вида 'a.b.c'
 * В случае, если значение не найдено, возвращает значение по умолчанию, если оно передано третьим аргументом
 *
 * @param obj - объект
 * @param path - путь до определенного свойства
 * @param defaultValue - значение по умолчанию
 */

export const get = <T extends Record<string, unknown>, D extends unknown>(
  obj: T,
  path: string,
  defaultValue?: D
): unknown | D => {
  const pathArr = path.split(".");

  const value = obj[pathArr[0]];

  if (value && typeof value === "object") {
    const nextPath = pathArr.slice(1).join(".");
    return get(value as Record<string, unknown>, nextPath, defaultValue);
  } else {
    return value ?? defaultValue;
  }
};

/**
 * Функцию генерирует query строку у GET-метода
 *
 * @param {object} data объект. Пример: {a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]}
 * @returns строка. Пример: ?a=1&b=2&c=[object Object]&k=1,2,3
 */
export const queryStringify = (data: object) =>
  Object.entries(data)
    .map(([k, v], i) => {
      if (i === 0) {
        return `?${k}=${v.toString()}`;
      }

      return `&${k}=${v.toString()}`;
    })
    .join("");
