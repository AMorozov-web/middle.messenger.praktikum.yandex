/**
 * Обработчик отправки формы, на событие onSubmit собирает данные
 *
 * @param evt - событие отправки формы
 */

export const onFormSubmit = <T extends Record<string, string>>(evt: Event) => {
  evt.preventDefault();
  const {elements} = evt.target as HTMLFormElement;

  return [...elements].reduce<T>((result, item) => {
    const buffer = {};
    if (item instanceof HTMLInputElement || item instanceof HTMLTextAreaElement) {
      item.checkValidity();

      const {name, value} = item;
      buffer[name] = value;
    }
    return {...result, ...buffer};
  }, {} as T);
};
