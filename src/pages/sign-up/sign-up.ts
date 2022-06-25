import {template} from './sign-up.tmpl';
import {Block} from '../../core';
import {SignUpController} from './sing-up-controller';
import {Button, Form, Input, LinkWithRouter} from '../../components';
import {onFocus, onFormSubmit} from '../../utils';
import {BUTTON_TYPE, INPUT_TYPE, PATTERN, TAG_NAME} from '../../constants';

const onSubmit = (evt: Event) => {
  const data = onFormSubmit<UserData>(evt);
  SignUpController.signUp(data);
};

const emailInput = new Input({
  className: 'sign-up__email',
  id: 'email',
  name: 'email',
  type: INPUT_TYPE.EMAIL,
  pattern: PATTERN.EMAIL,
  label: {
    content: 'Почта',
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
    content: 'Логин',
  },
  validation: {
    maxLength: 20,
    minLength: 3,
    required: true,
  },
});

const firstNameInput = new Input({
  className: 'sign-up__firstname',
  id: 'first_name',
  name: 'first_name',
  pattern: PATTERN.NAME,
  label: {
    content: 'Имя',
  },
  validation: {
    required: true,
  },
});

const lastNameInput = new Input({
  className: 'sign-up__lastname',
  id: 'second_name',
  name: 'second_name',
  pattern: PATTERN.NAME,
  label: {
    content: 'Фамилия',
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
    content: 'Телефон',
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
    content: 'Пароль',
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
    content: 'Пароль (ещё раз)',
  },
  validation: {
    maxLength: 40,
    minLength: 8,
    required: true,
  },
});

const submitButton = new Button({
  className: 'sign-up__submit',
  content: 'Зарегистрироваться',
  type: BUTTON_TYPE.SUBMIT,
});

export class SignUpPage extends Block {
  constructor() {
    super(TAG_NAME.DIV, {
      link: new LinkWithRouter({
        className: 'sign-up__sign-in',
        href: '/login',
        children: 'Войти',
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
