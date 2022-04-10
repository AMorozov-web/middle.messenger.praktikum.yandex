import {template} from './change-user-password.tmpl';
import {Block, Button, Form, Input, Link} from '../../components';
import {onFormSubmit, renderDOM} from '../../utils';
import {BUTTON_TYPE, TAG_NAME} from '../../constants';

type Props = {
  form: Form;
  link: Link;
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
  className: 'change-user-password-page__back',
  href: './profile.html',
  text: ' ',
});

const oldPasswordInput = new Input({
  className: 'change-user-password__field',
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

const newPasswordInput = new Input({
  className: 'change-user-password__field',
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

const repeatNewPasswordInput = new Input({
  className: 'change-user-password__field',
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

const saveButton = new Button({
  className: 'change-user-password__save',
  text: 'Сохранить',
  type: BUTTON_TYPE.SUBMIT,
});

const changePasswordForm = new Form({
  className: 'change-user-password-page__form',
  children: [oldPasswordInput, newPasswordInput, repeatNewPasswordInput, saveButton],
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

class ChangeUserPasswordPage extends Block {
  constructor(props: Props) {
    super(TAG_NAME.DIV, props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

const allProps = {
  link: toBackLink,
  form: changePasswordForm,
};

const page = new ChangeUserPasswordPage(allProps);

const root = document.getElementById('root');

renderDOM(root, page);
