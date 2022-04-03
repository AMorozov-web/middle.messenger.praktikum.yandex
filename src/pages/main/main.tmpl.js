export const template = `
<main>
  <section class="main-page">
    <h1 class="visually-hidden">Чаты</h1>
    <div class="main-page__inner-wrapper">
      <div class="main-page__buttons">
        <a href="#">Добавить чат</a>
        <a href="./profile.html">Профиль</a>
      </div>
      <label for="search" class="main-page__search">
        <p class="input__label">Поиск</p>
        <input type="text" name="search" id="search" class="input" />
      </label>
      <ul class="main-page__chats-list">
        <li class="main-page__chats-item">
          <div class="main-page__chat-avatar"></div>
          <p class="main-page__chat-name">Пользователь</p>
          <p class="main-page__chat-last-message">Последнее сообщение...</p>
          <p class="main-page__chat-time">12:00</p>
          <p class="main-page__chat-new-message-count">1</p>
        </li>
        <li class="main-page__chats-item">
          <div class="main-page__chat-avatar"></div>
          <p class="main-page__chat-name">Пользователь</p>
          <p class="main-page__chat-last-message">Последнее сообщение...</p>
          <p class="main-page__chat-time">12:00</p>
          <p class="main-page__chat-new-message-count">1</p>
        </li>
        <li class="main-page__chats-item">
          <div class="main-page__chat-avatar"></div>
          <p class="main-page__chat-name">Пользователь</p>
          <p class="main-page__chat-last-message">Последнее сообщение...</p>
          <p class="main-page__chat-time">12:00</p>
          <p class="main-page__chat-new-message-count">1</p>
        </li>
      </ul>
    </div>

    <div class="main-page__content">
      <div class="main-page__user-info">
        <div class="main-page__user-avatar"></div>
        <p class="main-page__user-name">Пользователь</p>
        <button class="main-page__user-button" type="button">
          <span class="main-page__button-icon"></span>
        </button>
      </div>
      <ul class="main-page__selected-chat">
        <li class="main-page__day">
          <p class="main-page__day-title">19 мая</p>
          <ul class="main-page__messages">
            <li class="main-page__message">
              <p class="main-page__message-content">
                Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не
                попали.
                Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.
              </p>
              <p class="main-page__message-time">
                11:56
              </p>
            </li>
            <li class="main-page__message main-page__message--self">
              <p class="main-page__message-content">
                Круто!
              </p>
              <p class="main-page__message-time">
                12:00
              </p>
            </li>
          </ul>
        </li>
      </ul>
      <form class="main-page__send-message">
        <button class="main-page__add-file" type="button">
          <span class="main-page__icon"></span>
        </button>
        <label for="new-message" class="main-page__new-message">
          <p class="input__label">Сообщение</p>
          <input
            type="text"
            id="new-message"
            class="input"
          />
        </label>
        <button class="main-page__submit-button" type="button">
          <span class="main-page__icon"></span>
        </button>
      </form>
    </div>
  </section>
</main>
`;
