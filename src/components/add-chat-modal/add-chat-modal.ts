import {template} from './add-chat-modal.tmpl';
import {Block} from '../../core';
import {Button, Form, Input} from '..';
import {onFormSubmit} from '../../utils';
import {BUTTON_TYPE, INPUT_TYPE} from '../../constants';

type Props = {
  form?: Form;
  className?: string;
  events?: Record<string, EventProps>;
  toggleHideClassName?: string;
  onSubmit?: (title: string) => Promise<void>; // TODO Maybe return Promise?
};

const input = new Input({
  className: 'add-chat-modal__input',
  type: INPUT_TYPE.TEXT,
  label: {content: 'Имя чата'},
  name: 'title',
  id: 'title',
  validation: {
    required: true,
  },
});

const button = new Button({
  className: 'add-chat-modal__button',
  content: 'Добавить',
  type: BUTTON_TYPE.SUBMIT,
});

export class AddChatModal extends Block<Props> {
  constructor(props: Props) {
    const form = new Form({
      className: 'add-chat-modal__form',
      children: [input, button],
      events: {
        submit: {
          callback: (evt) => {
            evt.preventDefault();
            const data = onFormSubmit<{title: string}>(evt);
            props.onSubmit?.(data.title).then(() => {
              this.hide();
            });
          },
        },
      },
    });

    super('div', {
      ...props,
      form,
      events: {
        click: {
          callback: (evt: Event) => {
            const {target} = evt as Event & {target: Node};
            const modal = this.getContent()?.querySelector('.add-chat-modal') as Node;

            if (target && target.contains(modal) && target !== modal) {
              this.hide();
            }
          },
        },
      },
    });
  }

  show() {
    this.setProps({toggleHideClassName: ''});
  }

  hide() {
    this.setProps({...this.props, toggleHideClassName: 'visually-hidden'});
  }

  render() {
    return this.compile(template, this.props);
  }
}
