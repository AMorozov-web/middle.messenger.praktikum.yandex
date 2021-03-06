export const template = `
  <li class="main-page__chats-item {{className}}" >
    <div class="main-page__chats-item-container">
      {{avatar}}
      <p class="main-page__chat-name">{{title}}</p>
      <p class="main-page__chat-last-message">{{lastMessage}}</p>
      <p class="main-page__chat-time">{{time}}</p>
      <p class="main-page__chat-new-message-count">{{unreadCount}}</p>
    </div>
  </li>
`;
