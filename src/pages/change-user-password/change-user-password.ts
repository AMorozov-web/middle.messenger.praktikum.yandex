import {template} from './change-user-password.tmpl';
import {Block} from '../../core';
import {Button, Form, Input, LinkWithRouter} from '../../components';
import {ChangePasswordData} from '../../api';
import {ChangeUserPasswordController} from './change-user-password-controller';
import {onFocus, onFormSubmit} from '../../utils';
import {BUTTON_TYPE, INPUT_TYPE, PATTERN, TAG_NAME} from '../../constants';

const onSubmit = (evt: Event) => {
  const data = onFormSubmit<ChangePasswordData>(evt);
  ChangeUserPasswordController.changeUserPassword(data);
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
