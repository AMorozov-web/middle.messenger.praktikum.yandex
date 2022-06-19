import {template} from './add-user-modal.tmpl';
import {Block} from '../../core';
import {Button, Form, Input} from '..';
import {onFormSubmit} from '../../utils';
import {BUTTON_TYPE, INPUT_TYPE} from '../../constants';

type Props = {
  form?: Form;
  className?: string;
  events?: Record<string, EventProps>;
  toggleHideClassName?: string;
  onSearch?: (login: string) => void;
};

const input = new Input({
  className: 'add-user-modal__input',
  type: INPUT_TYPE.TEXT,
  label: {content: 'Логин'},
  name: 'login',
  id: 'login',
  validation: {
    required: true,
  },
});

const button = new Button({
  className: 'add-user-modal__search-button',
  content: `<svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M7.592 8.414a3.667 3.667 0 1 1-5.185-5.186 3.667 3.667 0 0 1 5.185 5.186Zm.44 1.383a5.001 5.001 0 1 1
                    .944-.943l3.566 3.567-.943.942-3.566-3.566Z"
                    fill="currentColor"/>
            </svg>`,
  type: BUTTON_TYPE.SUBMIT,
});

export class AddUserModal extends Block<Props> {
  constructor(props: Props) {
    const form = new Form({
      className: 'add-user-modal__form',
      children: [input, button],
      events: {
        submit: {
          callback: (evt) => {
            evt.preventDefault();
            const data = onFormSubmit<{login: string}>(evt);
            props.onSearch?.(data.login);
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
            const modal = this.getContent()?.querySelector('.add-user-modal') as Node;

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
