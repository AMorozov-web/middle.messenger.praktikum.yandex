export const template = `
    <main>
      <section class="sign-up__content">
        <h1 class="sign-up__title">Регистрация</h1>
        <form class="sign-up__form">
          <label for="email" class="sign-up__email">
            <p class="input__label">Почта</p>
            <input type="text" name="email" id="email" class="input" />
          </label>
          <label for="login" class="sign-up__login">
            <p class="input__label">Логин</p>
            <input type="text" name="login" id="login" class="input" />
          </label>
          <label for="firstname" class="sign-up__firstname">
            <p class="input__label">Имя</p>
            <input type="text" name="firstname" id="firstname" class="input" />
          </label>
          <label for="lastname" class="sign-up__lastname">
            <p class="input__label">Фамилия</p>
            <input type="text" name="lastname" id="lastname" class="input" />
          </label>
          <label for="phone" class="sign-up__phone">
            <p class="input__label">Телефон</p>
            <input type="text" name="phone" id="phone" class="input" />
          </label>
          <label for="password" class="sign-up__password">
            <p class="input__label">Пароль</p>
            <input
              type="password"
              id="password"
              class="input"
            />
          </label>
          <label for="repeat-password" class="sign-up__repeat-password">
            <p class="input__label">Пароль (ещё раз)</p>
            <input
              type="password"
              id="repeat-password"
              class="input"
            />
          </label>
          <a
            href="./index.html"
            class="sign-up__submit"
            >
            Зарегистрироваться
          </a>
        </form>
        <a
          href="./index.html"
          class="sign-up__sign-in"
          >Войти</a
        >
      </section>
    </main>
`;
