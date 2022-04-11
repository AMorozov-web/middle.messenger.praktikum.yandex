import {template} from './main.tmpl';
import {
  Avatar,
  Block,
  Button,
  ChatItem,
  Form,
  Input,
  Link,
  List,
  Message,
  UserInfo,
} from '../../components';
import {onFormSubmit, renderDOM} from '../../utils';
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
  label: {
    text: 'Сообщение',
  },
  validation: {
    required: true,
  },
});

const submitButton = new Button({
  className: 'main-page__submit-button',
  text: ' ',
  type: BUTTON_TYPE.SUBMIT,
});

class MainPage extends Block {
  constructor() {
    super(TAG_NAME.DIV, {
      addChatLink: new Link({
        href: '',
        text: 'Добавить чат',
      }),
      profileLink: new Link({
        href: './profile.html',
        text: 'Профиль',
      }),
      chatsList: new List({
        className: 'main-page__chats-list',
        items: chatsListData,
      }),
      messagesList: new List({
        className: 'main-page__messages',
        items: messageData,
      }),
      form: new Form({
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
          text: '',
          type: BUTTON_TYPE.BUTTON,
        }),
        userName: 'Пользователь',
      }),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

const page = new MainPage();

const root = document.getElementById('root');

renderDOM(root, page);
