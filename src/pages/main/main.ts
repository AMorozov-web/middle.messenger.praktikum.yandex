import {template} from './main.tmpl';
import {Block} from '../../core';
import {connect, store} from '../../store';
import {
  AddChatModal,
  Avatar,
  Button,
  ChatItem,
  Form,
  Input,
  LinkWithRouter,
  List,
  Message,
  UserInfo,
} from '../../components';
import {MainController} from './main-controller';
import {getAvatarUrl, onFormSubmit} from '../../utils';
import {BUTTON_TYPE, TAG_NAME} from '../../constants';

const getChatsItems = (chats: Chat[], currentChat?: Nullable<Chat>) =>
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
      time: lastMessage?.time ? '12:00' : undefined,
      events: {
        click: {
          callback: () => {
            MainController.selectedChat(chat);
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

const messageData = new Array(4).fill('').map((_, i) => {
  const className = i % 2 !== 0 ? 'main-page__message--self' : '';

  return new Message({
    className,
    text: 'Круто!',
    time: '12:00',
  });
});

const newMessageInput = new Input({
  className: 'main-page__new-message',
  id: 'new-message',
  name: 'new-message',
  placeholder: 'Сообщение',
  label: {
    content: 'Сообщение',
  },
  validation: {
    required: true,
  },
});

const submitButton = new Button({
  className: 'main-page__submit-button',
  content: `<svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" d="M0 5.2h11v1.6H0z"/>
              <path d="m7 1 4 5-4 5" stroke="currentColor" stroke-width="1.6"/>
            </svg>`,
  type: BUTTON_TYPE.SUBMIT,
});

export class MainPage extends Block {
  constructor() {
    MainController.getChats();

    super(TAG_NAME.DIV, {
      addChatButton: new Button({
        content: `<svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 0v8M0 4h8" stroke="currentColor" stroke-linejoin="round"/>
                  </svg>
                  <span>Добавить чат</span>`,
        className: 'main-page__add-chat',
        events: {
          click: {
            callback: () => (this.props.addChatModal as AddChatModal).show(),
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
        items: getChatsItems(store.getState().chats),
      }),
      messagesList: new List({
        className: 'main-page__messages',
        items: messageData,
      }),
      sendMessageForm: new Form({
        className: 'main-page__send-message',
        children: [newMessageInput, submitButton],
        events: {
          submit: {
            callback: (evt) => onFormSubmit(evt),
          },
          focus: {
            callback: (evt) => {
              const target = evt.target as HTMLInputElement;

              if (!target.checkValidity()) {
                target.reportValidity();
              }
            },
            capture: true,
          },
        },
      }),
      userInfo: new UserInfo({
        avatar: new Avatar({
          wrapperClassName: 'main-page__user-avatar',
        }),
        button: new Button({
          className: 'main-page__user-button',
          content: '',
          type: BUTTON_TYPE.BUTTON,
        }),
        userName: 'Пользователь',
      }),
      addChatModal: new AddChatModal({
        className: 'main-page__add-chat-modal',
        onSubmit: (title) => MainController.createChat(title),
      }),
    });
  }

  componentDidMount(): void {
    (this.props.addChatModal as AddChatModal).hide();
  }

  render() {
    return this.compile(template, this.props);
  }
}
