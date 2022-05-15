import {template} from './profile.tmpl';
import {Block} from '../../core';
import {Avatar, LinkWithRouter} from '../../components';
import {TAG_NAME} from '../../constants';

const avatar = new Avatar({
  className: 'profile-page__avatar-img',
  wrapperClassName: 'profile-page__avatar-wrapper',
});

const toBackLink = new LinkWithRouter({
  className: 'profile-page__back',
  href: -1,
  children: ' ',
});

const changeDataLink = new LinkWithRouter({
  href: '/change-profile',
  children: 'Изменить данные',
});

const changePasswordLink = new LinkWithRouter({
  href: '/change-password',
  children: 'Изменить пароль',
});

const exitLink = new LinkWithRouter({
  href: '/login',
  children: 'Выйти',
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
