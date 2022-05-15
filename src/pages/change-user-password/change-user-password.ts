import {template} from './change-user-password.tmpl';
import {Block} from '../../core';
import {Button, Form, Input, LinkWithRouter} from '../../components';
import {onFormSubmit} from '../../utils';
import {BUTTON_TYPE, INPUT_TYPE, PATTERN, TAG_NAME} from '../../constants';

const redirectToProfile = () => {
  const link = document.createElement(TAG_NAME.A);
  link.href = '/profile.html';
  setTimeout(() => {
    link.click();
    link.remove();
  }, 500);
};

const oldPasswordInput = new Input({
  className: 'change-user-password__field',
  id: 'password',
  name: 'password',
  type: INPUT_TYPE.PASSWORD,
  pattern: PATTERN.PASSWORD,
  label: {
    text: 'Пароль',
  },
  validation: {
    maxLength: 40,
    minLength: 8,
    required: true,
  },
});

const newPasswordInput = new Input({
  className: 'change-user-password__field',
  id: 'password',
  name: 'password',
  type: INPUT_TYPE.PASSWORD,
  pattern: PATTERN.PASSWORD,
  label: {
    text: 'Пароль',
  },
  validation: {
    maxLength: 40,
    minLength: 8,
    required: true,
  },
});

const repeatNewPasswordInput = new Input({
  className: 'change-user-password__field',
  id: 'repeat-password',
  name: 'repeat-password',
  type: INPUT_TYPE.PASSWORD,
  pattern: PATTERN.PASSWORD,
  label: {
    text: 'Пароль (ещё раз)',
  },
  validation: {
    maxLength: 40,
    minLength: 8,
    required: true,
  },
});

const saveButton = new Button({
  className: 'change-user-password__save',
  text: 'Сохранить',
  type: BUTTON_TYPE.SUBMIT,
});

export class ChangeUserPasswordPage extends Block {
  constructor() {
    super(TAG_NAME.DIV, {
      link: new LinkWithRouter({
        className: 'change-user-password-page__back',
        href: '/profile',
        children: ' ',
      }),
      form: new Form({
        className: 'change-user-password-page__form',
        children: [oldPasswordInput, newPasswordInput, repeatNewPasswordInput, saveButton],
        events: {
          submit: {
            callback: (evt) => onFormSubmit(evt, redirectToProfile),
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
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
