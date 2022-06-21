export const template = `
  <div class="add-user-modal__overlay {{className}} {{toggleHideClassName}}">
    <div class="add-user-modal">
      <p class="add-user-modal__title">Добавить пользователя</p>
      {{form}}
      <div class="add-user-modal__results-scroll">
        {{searchResults}}
      </div>
    </div>
  </div>
`;
