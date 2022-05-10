import {template} from './profile.tmpl';
import {Block} from '../../core';
import {Avatar, Link} from '../../components';
import {TAG_NAME} from '../../constants';

const avatar = new Avatar({
  className: 'profile-page__avatar-img',
  wrapperClassName: 'profile-page__avatar-wrapper',
});

const toBackLink = new Link({
  className: 'profile-page__back',
  href: './main.html',
  text: ' ',
});

const changeDataLink = new Link({
  href: './change-user-data.html',
  text: 'Изменить данные',
});

const changePasswordLink = new Link({
  href: './change-user-password.html',
  text: 'Изменить пароль',
});

const exitLink = new Link({
  href: './index.html',
  text: 'Выйти',
});

export class ProfilePage extends Block {
  constructor() {
    super(TAG_NAME.DIV, {
      avatar,
      email: 'pochta@yandex.ru',
      login: 'ivanivanov',
      firstName: 'Иван',
      lastName: 'Иванов',
      nickName: 'Иван',
      phone: '+7 (909) 967 30 30',
      toBackLink,
      changeDataLink,
      changePasswordLink,
      exitLink,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
