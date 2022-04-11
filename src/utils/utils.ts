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
