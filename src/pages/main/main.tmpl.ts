export const template = `
<main class="main">
  <section class="main-page">
    <h1 class="visually-hidden">Чаты</h1>
    <aside class="main-page__inner-wrapper">
      <div class="main-page__buttons">
        {{addChatLink}}
        {{profileLink}}
      </div>
<!--      Будет реализовано позже -->
<!--      <label for="search" class="main-page__search">-->
<!--        <p class="input__label">Поиск</p>-->
<!--        <input type="text" name="search" id="search" class="input" />-->
<!--      </label>-->
      {{chatsList}}
    </aside>
    <div class="main-page__content">
      {{userInfo}}
      <ul class="main-page__selected-chat">
        <li class="main-page__day">
          <p class="main-page__day-title">19 мая</p>
          {{messagesList}}
        </li>
      </ul>
<!--      Будет реализовано позже -->
<!--        <button class="main-page__add-file" type="button">-->
<!--          <span class="main-page__icon"></span>-->
<!--        </button>-->
      {{form}}
    </div>
  </section>
</main>
`;
