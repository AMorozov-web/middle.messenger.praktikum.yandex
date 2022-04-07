export const template = `
<main>
  <section class="change-user-data-page">
    <h1 class="visually-hidden">Редактировать данные</h1>
    <div class="change-user-data-page__inner-wrapper">
      <a href="./main.html" class="change-user-data-page__back">
      </a>
    </div>
    <form class="change-user-data-page__form">
      <label for="email" class="change-user-data__field">
        <p class="input__label">Почта</p>
        <input type="text" name="email" id="email" class="input" />
      </label>
      <label for="login" class="change-user-data__field">
        <p class="input__label">Логин</p>
        <input type="text" name="login" id="login" class="input" />
      </label>
      <label for="firstname" class="change-user-data__field">
        <p class="input__label">Имя</p>
        <input type="text" name="firstname" id="firstname" class="input" />
      </label>
      <label for="lastname" class="change-user-data__field">
        <p class="input__label">Фамилия</p>
        <input type="text" name="lastname" id="lastname" class="input" />
      </label>
      <label for="nickname" class="change-user-data__field">
        <p class="input__label">Имя в чате</p>
        <input type="text" name="nickname" id="nickname" class="input" />
      </label>
      <label for="phone" class="change-user-data__field">
        <p class="input__label">Телефон</p>
        <input type="text" name="phone" id="phone" class="input" />
      </label>
      <a href="./profile.html" class="change-user-data__save" type="button">
        Сохранить
      </a>
    </form>
  </section>
</main>
`;
