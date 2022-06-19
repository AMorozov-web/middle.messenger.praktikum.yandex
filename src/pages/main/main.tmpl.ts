export const template = `
<main class="main">
  <section class="main-page">
    <h1 class="visually-hidden">Чаты</h1>
    <aside class="main-page__inner-wrapper">
      <div class="main-page__buttons">
        {{addChatButton}}
        {{profileLink}}
      </div>
<!--      Будет реализовано позже -->
<!--      <label for="search" class="main-page__search">-->
<!--        <p class="input__label">Поиск</p>-->
<!--        <input type="text" name="search" id="search" class="input" />-->
<!--      </label>-->
    <hr class="main-page__hr" />
      {{chatsList}}
    </aside>
    {{chat}}
  </section>
  {{addChatModal}}
</main>
`;
