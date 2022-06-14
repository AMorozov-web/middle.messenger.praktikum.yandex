import {template} from './profile.tmpl';
import {Block} from '../../core';
import {UserAvatar, LinkWithRouter, ConnectedUserData} from '../../components';
import {TAG_NAME} from '../../constants';

const avatar = new UserAvatar({
  className: 'profile-page__avatar-img',
  wrapperClassName: 'profile-page__avatar-wrapper',
});

const userData = new ConnectedUserData({});

const toBackLink = new LinkWithRouter({
  className: 'profile-page__back',
  href: -1,
  children: `<svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" d="M13 6.8H2V5.2h11z"/>
              <path d="M6 11 2 6l4-5" stroke="currentColor" stroke-width="1.6"/>
            </svg>`,
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
      userData,
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
