export const template = `
    <div class="main-page__chat">
      <div class="main-page__chat-info-container">
        {{chatInfo}}
        {{chatActions}}
      </div>
      {{daysList}}
      {{sendMessageForm}}
    </div>
`;

export const emptyTemplate = `<div class="main-page__chat main-page__chat--empty">
                                {{emptyMessage}}
                              </div>`;
