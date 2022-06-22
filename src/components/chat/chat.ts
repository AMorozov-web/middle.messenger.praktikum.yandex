import {emptyTemplate, template} from './chat.tmpl';
import {Block} from '../../core';
import {Button, ChatActions, ChatInfo, Form, Input} from '..';
import {connect} from '../../store';
import {getAvatarUrl, onFormSubmit} from '../../utils';
import {BUTTON_TYPE, TAG_NAME} from '../../constants';

type Props = {
  chatInfo?: ChatInfo;
  sendMessageForm?: Form;
  actionsButton?: Button;
  chatActions?: ChatActions;
  emptyMessage?: string;
  currentChat?: Nullable<ChatShortInfo>;
  onAddUser?: () => void;
  onDeleteChat?: (id?: number) => void;
};

const DEFAULT_EMPTY_MESSAGE = 'Выберите чат чтобы отправить сообщение';

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

export class Chat extends Block<Props> {
  constructor(props: Props) {
    super(TAG_NAME.DIV, {
      ...props,
      currentChat: null,
      emptyMessage: props.emptyMessage ?? DEFAULT_EMPTY_MESSAGE,
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
      chatInfo: new ChatInfo({
        chatName: '',
        chatAvatar: '',
      }),
      chatActions: new ChatActions({
        className: 'main-page__chat-actions',
        icon: `<svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="1.5" cy="2" r="1.5" fill="currentColor"/>
                <circle cx="1.5" cy="8" r="1.5" fill="currentColor"/>
                <circle cx="1.5" cy="14" r="1.5" fill="currentColor"/>
              </svg>`,
      }),
    });
  }

  componentDidMount() {
    if (this.props.currentChat) {
      (this.props.chatInfo as Block).setProps({
        chatName: this.props.currentChat.title,
        chatAvatar: this.props.currentChat.avatar
          ? getAvatarUrl(this.props.currentChat.avatar)
          : undefined,
      });
      this.props.chatActions?.setProps({
        onAddUser: () => this.props.onAddUser?.(),
        onDeleteChat: () => this.props.onDeleteChat?.(this.props.currentChat?.id),
      });
    }
  }

  render() {
    if (this.props.currentChat) {
      return this.compile(template, this.props);
    }

    return this.compile(emptyTemplate, this.props);
  }
}

export const ConnectedChat = connect(Chat, (state) => {
  if (state.currentChat) {
    return {currentChat: state.currentChat};
  }
  return {};
});
