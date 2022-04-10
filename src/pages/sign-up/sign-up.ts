import {template} from './sign-up.tmpl';
import {onFormSubmit, renderDOM} from '../../utils';
import {Block, Button, Form, Input, Link} from '../../components';
import {BUTTON_TYPE, INPUT_TYPE, TAG_NAME} from '../../constants';

type Props = {
  form: Form;
  link: Link;
};

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
  type: INPUT_TYPE.PHONE,
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

const signUpForm = new Form({
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
});

const signInLink = new Link({
  className: 'sign-up__sign-in',
  href: './index.html',
  text: 'Войти',
});

class SignUpPage extends Block {
  constructor(props: Props) {
    super(TAG_NAME.DIV, props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

const allProps = {
  form: signUpForm,
  link: signInLink,
};

const page = new SignUpPage(allProps);

const root = document.getElementById('root');

renderDOM(root, page);
