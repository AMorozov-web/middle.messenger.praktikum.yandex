export const template = `
<main>
  <section class="profile-page">
    <h1 class="visually-hidden">Профиль</h1>
    <div class="profile-page__inner-wrapper">
      <a href="./main.html" class="profile-page__back">
      </a>
    </div>
    <div class="profile-page__content">
      <div class="profile-page__avatar">
        <button class="profile-page__edit-avatar"></button>
      </div>
      <p class="profile-page__user-name">Иван</p>
      <ul class="profile-page__user-data">
        <li class="profile-page__user-data-item">
          <p class="profile-page__user-data-label">Почта</p>
          <p class="profile-page__user-data-value">pochta@yandex.ru</p>
        </li>
        <li class="profile-page__user-data-item">
          <p class="profile-page__user-data-label">Логин</p>
          <p class="profile-page__user-data-value">ivanivanov</p>
        </li>
        <li class="profile-page__user-data-item">
          <p class="profile-page__user-data-label">Имя</p>
          <p class="profile-page__user-data-value">Иван</p>
        </li>
        <li class="profile-page__user-data-item">
          <p class="profile-page__user-data-label">Фамилия</p>
          <p class="profile-page__user-data-value">Иванов</p>
        </li>
        <li class="profile-page__user-data-item">
          <p class="profile-page__user-data-label">Имя в чате</p>
          <p class="profile-page__user-data-value">Иван</p>
        </li>
        <li class="profile-page__user-data-item">
          <p class="profile-page__user-data-label">Телефон</p>
          <p class="profile-page__user-data-value">+7 (909) 967 30 30</p>
        </li>
      </ul>
      <ul class="profile-page__user-controls">
        <li class="profile-page__user-controls-item">
          <a href="./change-user-data.html">Изменить данные</a>
        </li>
        <li class="profile-page__user-controls-item">
          <a href="./change-user-password.html">Изменить пароль</a>
        </li>
        <li class="profile-page__user-controls-item profile-page__user-controls-item--exit">
          <a href="./index.html">Выйти</a>
        </li>
      </ul>
    </div>
  </section>
</main>
`;
