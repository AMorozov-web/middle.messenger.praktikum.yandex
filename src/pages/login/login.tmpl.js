export const template = `
    <main>
      <section class="login-page__content">
        <h1 class="login-page__title">Вход</h1>
        <form class="login-page__form">
          <label for="login" class="login-page__login">
            <p class="input__label">Логин</p>
            <input type="text" name="login" id="login" class="input" />
          </label>
          <label for="password" class="login-page__password">
            <p class="input__label">Пароль</p>
            <input
              type="password"
              id="password"
              class="input"
            />
          </label>
          <a
            href="./main.html"
            class="login-page__submit"
            >
            Авторизоваться
          </a>
        </form>
        <a
          href="./sign-up.html"
          class="login-page__signup"
          >Нет аккаунта?</a
        >
      </section>
    </main>
`;
