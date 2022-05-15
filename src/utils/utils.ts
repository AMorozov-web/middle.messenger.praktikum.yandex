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

export const isEqual = (left: Indexed, right: Indexed): boolean => {
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

export const mergeObjects = (left: Indexed, right: Indexed): Indexed => {
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

export const setValue = (object: Indexed, path: string, value: unknown): Indexed => {
  if (!isObject(object)) {
    return object;
  }

  const splited = path.split('.');

  const objectToSet = splited.reduceRight<Indexed>((prev, curr) => {
    return {
      [curr]: prev,
    };
  }, value as Indexed);

  return mergeObjects(object, objectToSet);
};
