import {template} from './change-user-data.tmpl';
import {Block} from '../../core';
import {
  Button,
  Form,
  LinkWithRouter,
  UserEmailInput,
  UserFirstNameInput,
  UserLoginInput,
  UserNickNameInput,
  UserPhoneInput,
  UserSecondNameInput,
} from '../../components';
import {ChangeProfileData} from '../../api';
import {ChangeUserDataController} from '.';
import {onFocus, onFormSubmit} from '../../utils';
import {BUTTON_TYPE, INPUT_TYPE, PATTERN, TAG_NAME} from '../../constants';

const onSubmit = (evt: Event) => {
  const data = onFormSubmit<ChangeProfileData>(evt);
  ChangeUserDataController.changeUserData(data);
};

const emailInput = new UserEmailInput({
  className: 'change-user-data__field',
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

const loginInput = new UserLoginInput({
  className: 'change-user-data__field',
  id: 'login',
  name: 'login',
  pattern: PATTERN.LOGIN,
  type: INPUT_TYPE.TEXT,
  label: {
    content: 'Логин',
  },
  validation: {
    maxLength: 20,
    minLength: 3,
    required: true,
  },
});

const firstNameInput = new UserFirstNameInput({
  className: 'change-user-data__field',
  id: 'first_name',
  name: 'first_name',
  pattern: PATTERN.NAME,
  type: INPUT_TYPE.TEXT,
  label: {
    content: 'Имя',
  },
  validation: {
    required: true,
  },
});

const lastNameInput = new UserSecondNameInput({
  className: 'change-user-data__field',
  id: 'second_name',
  name: 'second_name',
  pattern: PATTERN.NAME,
  type: INPUT_TYPE.TEXT,
  label: {
    content: 'Фамилия',
  },
  validation: {
    required: true,
  },
});

const nickNameInput = new UserNickNameInput({
  className: 'change-user-data__field',
  id: 'display_name',
  name: 'display_name',
  pattern: PATTERN.NAME,
  type: INPUT_TYPE.TEXT,
  label: {
    content: 'Имя в чате',
  },
  validation: {
    required: true,
  },
});

const phoneInput = new UserPhoneInput({
  className: 'change-user-data__field',
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
        children: `<svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor" d="M13 6.8H2V5.2h11z"/>
                    <path d="M6 11 2 6l4-5" stroke="currentColor" stroke-width="1.6"/>
                  </svg>`,
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
