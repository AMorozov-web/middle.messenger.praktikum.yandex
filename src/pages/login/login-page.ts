import {template} from './login-page.tmpl';
import {Block} from '../../core';
import {SignInData} from '../../api';
import {Button, Form, Input, LinkWithRouter} from '../../components';
import {LoginController} from './login-controller';
import {onFocus, onFormSubmit} from '../../utils';
import {BUTTON_TYPE, INPUT_TYPE, TAG_NAME} from '../../constants';

const onSubmit = (evt: Event) => {
  const data = onFormSubmit<SignInData>(evt);
  LoginController.login(data);
};

const loginInput = new Input({
  className: 'login-page__login',
  id: 'login',
  name: 'login',
  label: {
    text: 'Логин',
  },
  validation: {
    maxLength: 20,
    minLength: 3,
    required: true,
  },
});

const passwordInput = new Input({
  className: 'login-page__password',
  id: 'password',
  type: INPUT_TYPE.PASSWORD,
  name: 'password',
  label: {
    text: 'Пароль',
  },
  validation: {
    maxLength: 40,
    minLength: 8,
    required: true,
  },
});

const submitButton = new Button({
  className: 'login-page__submit',
  text: 'Авторизоваться',
  type: BUTTON_TYPE.SUBMIT,
});

export class LoginPage extends Block {
  constructor() {
    super(TAG_NAME.DIV, {
      link: new LinkWithRouter({
        className: 'login-page__signup',
        href: '/sign-up',
        children: 'Нет аккаунта?',
      }),
      form: new Form({
        className: 'login-page__form',
        children: [loginInput, passwordInput, submitButton],
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
