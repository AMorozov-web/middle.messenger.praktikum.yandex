import {template} from './main.tmpl';
import {Block} from '../../core';
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
import {onFormSubmit} from '../../utils';
import {BUTTON_TYPE, TAG_NAME} from '../../constants';

const chatsListData = new Array(3).fill('').map(
  () =>
    new ChatItem({
      avatar: new Avatar({
        wrapperClassName: 'main-page__chat-avatar',
      }),
      lastMessage: 'Последнее сообщение...',
      newMessagesCount: '1',
      userName: 'Пользователь',
      time: '12:00',
    }),
);

const messageData = new Array(4).fill('').map((_, i) => {
  const className = i % 2 !== 0 ? 'main-page__message--self' : undefined;

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
  label: {
    content: 'Сообщение',
  },
  validation: {
    required: true,
  },
});

const submitButton = new Button({
  className: 'main-page__submit-button',
  content: ' ',
  type: BUTTON_TYPE.SUBMIT,
});

export class MainPage extends Block {
  constructor() {
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
      chatsList: new List({
        className: 'main-page__chats-list',
        items: chatsListData,
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
