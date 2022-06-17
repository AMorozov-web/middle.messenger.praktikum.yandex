import {template} from './change-user-password.tmpl';
import {Block} from '../../core';
import {Button, Form, Input, LinkWithRouter} from '../../components';
import {ChangeUserPasswordController} from './change-user-password-controller';
import {omit, onFocus, onFormSubmit} from '../../utils';
import {BUTTON_TYPE, INPUT_TYPE, PATTERN, TAG_NAME} from '../../constants';

const onSubmit = (evt: Event) => {
  const data = onFormSubmit<{oldPassword: string; newPassword: string; repeatNewPassword: string}>(
    evt,
  );
  ChangeUserPasswordController.changeUserPassword(omit(data, 'repeatNewPassword'));
};

const oldPasswordInput = new Input({
  className: 'change-user-password__field',
  id: 'oldPassword',
  name: 'oldPassword',
  type: INPUT_TYPE.PASSWORD,
  label: {
    content: 'Пароль',
  },
  validation: {
    maxLength: 40,
    minLength: 8,
    required: true,
  },
});

const newPasswordInput = new Input({
  className: 'change-user-password__field',
  id: 'newPassword',
  name: 'newPassword',
  type: INPUT_TYPE.PASSWORD,
  pattern: PATTERN.PASSWORD,
  label: {
    content: 'Пароль',
  },
  validation: {
    maxLength: 40,
    minLength: 8,
    required: true,
  },
});

const repeatNewPasswordInput = new Input({
  className: 'change-user-password__field',
  id: 'repeatNewPassword',
  name: 'repeatNewPassword',
  type: INPUT_TYPE.PASSWORD,
  pattern: PATTERN.PASSWORD,
  label: {
    content: 'Пароль (ещё раз)',
  },
  validation: {
    maxLength: 40,
    minLength: 8,
    required: true,
  },
});

const saveButton = new Button({
  className: 'change-user-password__save',
  content: 'Сохранить',
  type: BUTTON_TYPE.SUBMIT,
});

export class ChangeUserPasswordPage extends Block {
  constructor() {
    super(TAG_NAME.DIV, {
      link: new LinkWithRouter({
        className: 'change-user-password-page__back',
        href: '/profile',
        children: `<svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor" d="M13 6.8H2V5.2h11z"/>
                    <path d="M6 11 2 6l4-5" stroke="currentColor" stroke-width="1.6"/>
                  </svg>`,
      }),
      form: new Form({
        className: 'change-user-password-page__form',
        children: [oldPasswordInput, newPasswordInput, repeatNewPasswordInput, saveButton],
        events: {
          submit: {
            callback: onSubmit,
          },
          focus: {
            callback: onFocus,
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
