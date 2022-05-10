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
 * Предикат на тип объекта Record<string, unknown>
 *
 * @param value - определяемое значение
 */

export const isObject = (value: unknown): value is Record<string, unknown> =>
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
