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

type Props = {
  addChatLink: Link;
  profileLink: Link;
  chatsList: List;
  messagesList: List;
  form: Form;
  userInfo: UserInfo;
};

const addChatLink = new Link({
  href: '',
  text: 'Добавить чат',
});

const profileLink = new Link({
  href: './profile.html',
  text: 'Профиль',
});

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

const chatsList = new List({
  className: 'main-page__chats-list',
  items: chatsListData,
});

const messageData = new Array(4).fill('').map((_, i) => {
  const className = i % 2 !== 0 ? 'main-page__message--self' : '';

  return new Message({
    className,
    text: 'Круто!',
    time: '12:00',
  });
});

const messagesList = new List({
  className: 'main-page__messages',
  items: messageData,
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

const newMessageForm = new Form({
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
});

const userInfo = new UserInfo({
  avatar: new Avatar({
    wrapperClassName: 'main-page__user-avatar',
  }),
  button: new Button({
    className: 'main-page__user-button',
    text: '',
    type: BUTTON_TYPE.BUTTON,
  }),
  userName: 'Пользователь',
});

class MainPage extends Block {
  constructor(props: Props) {
    super(TAG_NAME.DIV, props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

const allProps = {
  addChatLink,
  profileLink,
  chatsList,
  messagesList,
  form: newMessageForm,
  userInfo,
};

const page = new MainPage(allProps);

const root = document.getElementById('root');

renderDOM(root, page);
