import {template} from './change-user-data.tmpl';
import {Block, Button, Form, Input, Link} from '../../components';
import {onFormSubmit, renderDOM} from '../../utils';
import {BUTTON_TYPE, INPUT_TYPE, TAG_NAME} from '../../constants';

type Props = {
  link: Link;
  form: Form;
};

const redirectToProfile = () => {
  const link = document.createElement(TAG_NAME.A);
  link.href = '/profile.html';
  setTimeout(() => {
    link.click();
    link.remove();
  }, 500);
};

const toBackLink = new Link({
  className: 'change-user-data-page__back',
  href: './profile.html',
  text: ' ',
});

const emailInput = new Input({
  className: 'change-user-data__field',
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
  className: 'change-user-data__field',
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
  className: 'change-user-data__field',
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
  className: 'change-user-data__field',
  id: 'last-name',
  name: 'last-name',
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
  type: INPUT_TYPE.PHONE,
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

const changeDataForm = new Form({
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
      callback: (evt) => onFormSubmit(evt, redirectToProfile),
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

class ChangeUserDataPage extends Block {
  constructor(props: Props) {
    super(TAG_NAME.DIV, props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

const allProps = {
  link: toBackLink,
  form: changeDataForm,
};

const page = new ChangeUserDataPage(allProps);

const root = document.getElementById('root');

renderDOM(root, page);
