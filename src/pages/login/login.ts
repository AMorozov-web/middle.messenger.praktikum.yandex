import {template} from './login.tmpl';
import {Block} from '../../core';
import {Button, Form, Input, Link} from '../../components';
import {onFormSubmit, renderDOM} from '../../utils';
import {BUTTON_TYPE, TAG_NAME} from '../../constants';

const redirectToMain = () => {
  const link = document.createElement(TAG_NAME.A);
  link.href = '/main.html';
  setTimeout(() => {
    link.click();
    link.remove();
  }, 500);
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

class LoginPage extends Block {
  constructor() {
    super(TAG_NAME.DIV, {
      link: new Link({
        className: 'login-page__signup',
        href: './sign-up.html',
        text: 'Нет аккаунта?',
      }),
      form: new Form({
        className: 'login-page__form',
        children: [loginInput, passwordInput, submitButton],
        events: {
          submit: {
            callback: (evt) => onFormSubmit(evt, redirectToMain),
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

const page = new LoginPage();

const root = document.getElementById('root');

renderDOM(root, page);
