export const template = `
    <div class="main-page__chat">
      <div class="main-page__chat-info-container">
        {{chatInfo}}
        {{chatActions}}
      </div>
      <ul class="main-page__selected-chat">
        <li class="main-page__day">
          <p class="main-page__day-title">19 мая</p>
          {{messagesList}}
        </li>
      </ul>
      {{sendMessageForm}}
    </div>
`;

export const emptyTemplate = `<div class="main-page__chat main-page__chat--empty">
                                {{emptyMessage}}
                              </div>`;
