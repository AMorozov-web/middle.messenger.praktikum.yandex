export const template = `
<main class="main">
  <section class="profile-page">
    <h1 class="visually-hidden">Профиль</h1>
    <div class="profile-page__inner-wrapper">
     {{toBackLink}}
    </div>
    <div class="profile-page__content">
      <div class="profile-page__avatar">
        {{avatar}}
        {{editAvatarInput}}
      </div>
      {{userData}}
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
