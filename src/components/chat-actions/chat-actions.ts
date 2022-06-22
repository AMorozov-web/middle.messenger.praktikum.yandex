import {Block} from '../../core';
import {Button} from '../button';
import {BUTTON_TYPE, TAG_NAME} from '../../constants';

type Props = {
  className?: string;
  addUserButton?: Button;
  deleteChatButton?: Button;
  onAddUser?: () => void;
  onDeleteChat?: () => void;
  icon?: string;
};

const addUserButton = new Button({
  className: 'chat-action__add-user-button',
  content: 'Добавить пользователя',
  type: BUTTON_TYPE.BUTTON,
  events: {},
});

const deleteChatButton = new Button({
  className: 'chat-actions__delete-button',
  content: 'Удалить чат',
  type: BUTTON_TYPE.BUTTON,
  events: {},
});

export class ChatActions extends Block<Props> {
  constructor(props: Props) {
    super(TAG_NAME.BUTTON, {
      ...props,
      addUserButton,
      deleteChatButton,
      onAddUser: undefined,
      onDeleteChat: undefined,
    });
  }

  componentDidMount() {
    if (this.children.addUserButton) {
      (this.children.addUserButton as Block).setProps({
        events: {click: {callback: () => this.props.onAddUser?.()}},
      });
    }
    if (this.children.deleteChatButton) {
      (this.children.deleteChatButton as Block).setProps({
        events: {click: {callback: () => this.props.onDeleteChat?.()}},
      });
    }
  }

  render() {
    return this.compile(
      `<div class="{{className}}">
                 {{icon}}
                 <div class="chat-actions__container">
                  <div class="chat-actions__tooltip">
                    {{addUserButton}}
                    {{deleteChatButton}}
                  </div>
                 </div>
               </div>`,
      this.props,
    );
  }
}
