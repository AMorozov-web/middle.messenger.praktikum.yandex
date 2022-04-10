export const template = `
<main>
  <section class="error-page">
    <h1 class="visually-hidden">Произошла ошибка</h1>
    <div class="error-page__content">
      <p class="error-page__code">{{error.code}}</p>
      <p class="error-page__description">{{error.description}}</p>
      {{children}}
    </div>
  </section>
</main>
`;
