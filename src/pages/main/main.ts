import {template} from './main.tmpl';
import {Block} from '../../core';
import {connect, store} from '../../store';
import {
  AddChatModal,
  AddUserModal,
  Avatar,
  Button,
  ChatItem,
  ConnectedChat,
  LinkWithRouter,
  List,
} from '../../components';
import {MainController} from './main-controller';
import {getAvatarUrl, getTimeFromDate} from '../../utils';
import {TAG_NAME} from '../../constants';

const getChatsItems = (chats: ChatShortInfo[], currentChat?: Nullable<ChatShortInfo>) =>
  chats.map((chat) => {
    const {avatar, last_message: lastMessage, title, unread_count: unreadCount} = chat;
    const className = currentChat?.id === chat.id ? 'main-page__chats-item---selected' : '';

    return new ChatItem({
      avatar: new Avatar({
        wrapperClassName: 'main-page__chat-avatar',
        src: getAvatarUrl(avatar),
      }),
      className,
      unreadCount: unreadCount ? String(unreadCount) : undefined,
      title: title ?? '',
      lastMessage: lastMessage?.content ?? '',
      time: lastMessage?.time ? getTimeFromDate(lastMessage.time) : undefined,
      events: {
        click: {
          callback: () => {
            MainController.selectChat(chat);
          },
        },
      },
    });
  });

const ChatsList = connect(List, (state) => {
  if (state.chats.length) {
    return {items: getChatsItems(state.chats, state.currentChat)};
  }
  return {items: []};
});

// const messageData = new Array(4).fill('').map((_, i) => {
//   const className = i % 2 !== 0 ? 'main-page__message--self' : '';
//
//   return new Message({
//     className,
//     text: 'Круто!',
//     time: '12:00',
//   });
// });

export class MainPage extends Block {
  constructor() {
    MainController.init();

    super(TAG_NAME.DIV, {
      addChatButton: new Button({
        content: `<svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 0v8M0 4h8" stroke="currentColor" stroke-linejoin="round"/>
                  </svg>
                  <span>Добавить чат</span>`,
        className: 'main-page__add-chat',
        events: {
          click: {
            callback: () => (this.props.addChatModal as Block).show(),
          },
        },
      }),
      profileLink: new LinkWithRouter({
        className: 'main-page__profile-link',
        href: '/profile',
        children: `<span>Профиль</span>
                  <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="m1 9 4-4-4-4" stroke="currentColor"/>
                  </svg>`,
      }),
      chatsList: new ChatsList({
        className: 'main-page__chats-list',
        items: [],
      }),
      chat: new ConnectedChat({
        onAddUser: () => (this.props.addUserModal as Block).show(),
        onDeleteChat: (id) => {
          if (id) {
            MainController.deleteChat(id);
          }
        },
      }),
      addChatModal: new AddChatModal({
        onSubmit: (title) => MainController.createChat(title),
      }),
      addUserModal: new AddUserModal({
        onSearch: (login) => {
          MainController.searchByLogin(login);
        },
        onAddUser: (userId, chatId) =>
          MainController.addUserToChat(userId, chatId, () => {
            (this.props.addUserModal as Block).hide();
            store.set('searchResult', []);
          }),
      }),
    });
  }

  componentDidMount(): void {
    (this.props.addChatModal as Block).hide();
    (this.props.addUserModal as Block).hide();
  }

  render() {
    return this.compile(template, this.props);
  }
}
