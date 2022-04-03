export const template = `
<main>
  <section class="change-user-password-page">
    <h1 class="visually-hidden">Изменить пароль</h1>
    <div class="change-user-password-page__inner-wrapper">
      <a href="./main.html" class="change-user-password-page__back">
      </a>
    </div>
    <form class="change-user-password-page__form">
      <label for="old-password" class="change-user-password__field">
        <p class="input__label">Старый пароль</p>
        <input type="text" name="old-password" id="old-password" class="input" />
      </label>
      <label for="new-password" class="change-user-password__field">
        <p class="input__label">Новый пароль</p>
        <input type="text" name="new-password" id="new-password" class="input" />
      </label>
      <label for="repeat-new-password" class="change-user-password__field">
        <p class="input__label">Повторите новый пароль</p>
        <input type="text" name="repeat-new-password" id="repeat-new-password" class="input" />
      </label>
      <a href="./profile.html" class="change-user-password__save" type="button">
        Сохранить
      </a>
    </form>
  </section>
</main>
`;
