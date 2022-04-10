import {template} from './login.tmpl';
import {onFormSubmit, renderDOM} from '../../utils';
import {Block, Button, Form, Input, Link} from '../../components';
import {BUTTON_TYPE, TAG_NAME} from '../../constants';

type Props = {
  form: Form;
  link: Link;
};

const redirectToMain = () => {
  const link = document.createElement(TAG_NAME.A);
  link.href = '/main.html';
  link.click();
  link.remove();
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

const loginForm = new Form({
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
});

const signUpLink = new Link({
  className: 'login-page__signup',
  href: './sign-up.html',
  text: 'Нет аккаунта?',
});

class LoginPage extends Block {
  constructor(props: Props) {
    super(TAG_NAME.DIV, props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

const allProps = {
  form: loginForm,
  link: signUpLink,
};

const page = new LoginPage(allProps);

const root = document.getElementById('root');

renderDOM(root, page);
