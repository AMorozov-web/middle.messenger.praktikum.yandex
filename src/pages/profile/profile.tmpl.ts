export const template = `
<main>
  <section class="profile-page">
    <h1 class="visually-hidden">Профиль</h1>
    <div class="profile-page__inner-wrapper">
     {{toBackLink}}
    </div>
    <div class="profile-page__content">
      <div class="profile-page__avatar">
        {{avatar}}
        <button class="profile-page__edit-avatar"></button>
      </div>
      <p class="profile-page__user-name">{{firstName}}</p>
      <ul class="profile-page__user-data">
        <li class="profile-page__user-data-item">
          <p class="profile-page__user-data-label">Почта</p>
          <p class="profile-page__user-data-value">{{email}}</p>
        </li>
        <li class="profile-page__user-data-item">
          <p class="profile-page__user-data-label">Логин</p>
          <p class="profile-page__user-data-value">{{login}}</p>
        </li>
        <li class="profile-page__user-data-item">
          <p class="profile-page__user-data-label">Имя</p>
          <p class="profile-page__user-data-value">{{firstName}}</p>
        </li>
        <li class="profile-page__user-data-item">
          <p class="profile-page__user-data-label">Фамилия</p>
          <p class="profile-page__user-data-value">{{lastName}}</p>
        </li>
        <li class="profile-page__user-data-item">
          <p class="profile-page__user-data-label">Имя в чате</p>
          <p class="profile-page__user-data-value">{{nickName}}</p>
        </li>
        <li class="profile-page__user-data-item">
          <p class="profile-page__user-data-label">Телефон</p>
          <p class="profile-page__user-data-value">{{phone}}</p>
        </li>
      </ul>
      <ul class="profile-page__user-controls">
        <li class="profile-page__user-controls-item">
          {{changeDataLink}}
        </li>
        <li class="profile-page__user-controls-item">
          {{changePasswordLink}}
        </li>
        <li class="profile-page__user-controls-item profile-page__user-controls-item--exit">
          {{exitLink}}
        </li>
      </ul>
    </div>
  </section>
</main>
`;
