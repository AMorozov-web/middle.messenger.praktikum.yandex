export const template = `
<div>
  <p class="profile-page__user-name">{{firstName}}</p><ul class="profile-page__user-data">
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
</div>`;
