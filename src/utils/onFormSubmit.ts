/**
 * Обработчик отправки формы, на событие onSubmit собирает данные, и выполняет функцию, если она был передана
 *
 * @param evt - событие отправки формы
 * @param callback - функцию, которая выполнится после сбора данных
 */

export const onFormSubmit = (evt: Event, callback?: () => void) => {
  evt.preventDefault();
  const {elements} = evt.target as HTMLFormElement;

  const data = [...elements].reduce((result, item) => {
    if (item instanceof HTMLInputElement || item instanceof HTMLTextAreaElement) {
      item.checkValidity();
      result[item.name] = item.value;
    }
    return result;
  }, {} as Record<string, string>);

  console.log(data);

  if (callback) {
    callback();
  }
};
