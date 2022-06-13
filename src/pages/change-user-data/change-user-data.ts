import {template} from './change-user-data.tmpl';
import {Block} from '../../core';
import {Button, Form, Input, LinkWithRouter} from '../../components';
import {ChangeProfileData} from '../../api';
import {ChangeUserDataController} from '.';
import {onFocus, onFormSubmit} from '../../utils';
import {BUTTON_TYPE, INPUT_TYPE, PATTERN, TAG_NAME} from '../../constants';

const onSubmit = (evt: Event) => {
  const data = onFormSubmit<ChangeProfileData>(evt);
  ChangeUserDataController.changeUserData(data);
};

const emailInput = new Input({
  className: 'change-user-data__field',
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
  className: 'change-user-data__field',
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
  className: 'change-user-data__field',
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
  className: 'change-user-data__field',
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

const nickNameInput = new Input({
  className: 'change-user-data__field',
  id: 'nickname',
  name: 'nickname',
  pattern: PATTERN.NAME,
  label: {
    text: 'Имя в чате',
  },
  validation: {
    required: true,
  },
});

const phoneInput = new Input({
  className: 'change-user-data__field',
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

const saveButton = new Button({
  className: 'change-user-data__save',
  text: 'Сохранить',
  type: BUTTON_TYPE.SUBMIT,
});

export class ChangeUserDataPage extends Block {
  constructor() {
    super(TAG_NAME.DIV, {
      link: new LinkWithRouter({
        className: 'change-user-data-page__back',
        href: '/profile',
        children: ' ',
      }),
      form: new Form({
        className: 'change-user-data-page__form',
        children: [
          emailInput,
          loginInput,
          firstNameInput,
          lastNameInput,
          nickNameInput,
          phoneInput,
          saveButton,
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
