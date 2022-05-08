import {template} from './sign-up.tmpl';
import {onFormSubmit, renderDOM} from '../../utils';
import {Block, Button, Form, Input, Link} from '../../components';
import {BUTTON_TYPE, INPUT_TYPE, PATTERN, TAG_NAME} from '../../constants';

const redirectToSignIn = () => {
  const link = document.createElement(TAG_NAME.A);
  link.href = '/index.html';
  setTimeout(() => {
    link.click();
    link.remove();
  }, 500);
};

const emailInput = new Input({
  className: 'sign-up__email',
  id: 'email',
  name: 'email',
  type: INPUT_TYPE.EMAIL,
  pattern: PATTERN.EMAIL,
  label: {
    text: 'Почта',
  },
  validation: {
    required: true,
  },
});

const loginInput = new Input({
  className: 'sign-up__login',
  id: 'login',
  name: 'login',
  pattern: PATTERN.LOGIN,
  label: {
    text: 'Логин',
  },
  validation: {
    maxLength: 20,
    minLength: 3,
    required: true,
  },
});

const firstNameInput = new Input({
  className: 'sign-up__firstname',
  id: 'first-name',
  name: 'first-name',
  pattern: PATTERN.NAME,
  label: {
    text: 'Имя',
  },
  validation: {
    required: true,
  },
});

const lastNameInput = new Input({
  className: 'sign-up__lastname',
  id: 'last-name',
  name: 'last-name',
  pattern: PATTERN.NAME,
  label: {
    text: 'Фамилия',
  },
  validation: {
    required: true,
  },
});

const phoneInput = new Input({
  className: 'sign-up__phone',
  id: 'phone',
  name: 'phone',
  pattern: PATTERN.PHONE,
  type: INPUT_TYPE.TEL,
  label: {
    text: 'Телефон',
  },
  validation: {
    required: true,
  },
});

const passwordInput = new Input({
  className: 'sign-up__password',
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

const repeatPasswordInput = new Input({
  className: 'sign-up__repeat-password',
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

const submitButton = new Button({
  className: 'sign-up__submit',
  text: 'Зарегистрироваться',
  type: BUTTON_TYPE.SUBMIT,
});

class SignUpPage extends Block {
  constructor() {
    super(TAG_NAME.DIV, {
      link: new Link({
        className: 'sign-up__sign-in',
        href: './index.html',
        text: 'Войти',
      }),
      form: new Form({
        className: 'sign-up__form',
        children: [
          emailInput,
          loginInput,
          firstNameInput,
          lastNameInput,
          phoneInput,
          passwordInput,
          repeatPasswordInput,
          submitButton,
        ],
        events: {
          submit: {
            callback: (evt) => onFormSubmit(evt, redirectToSignIn),
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

const page = new SignUpPage();

const root = document.getElementById('root');

renderDOM(root, page);
