import {template} from './profile.tmpl';
import {Block} from '../../core';
import {UserAvatar, LinkWithRouter, ConnectedUserData, Button, Input} from '../../components';
import {ProfileController} from './profile-controller';
import {BUTTON_TYPE, INPUT_TYPE, TAG_NAME} from '../../constants';
import {ChangeUserDataController} from '../change-user-data';

const onClick = () => ProfileController.logout();

const onAvatarChange = (evt: Event) => {
  const file = (evt.target as HTMLInputElement).files?.[0];

  if (file) {
    const formData = new FormData();
    const blob = new Blob([file], {type: file.type});
    formData.append('avatar', blob, file.name);

    ChangeUserDataController.changeAvatar(formData);
    evt.preventDefault();
  }
};

const avatar = new UserAvatar({
  className: 'profile-page__avatar-img',
  wrapperClassName: 'profile-page__avatar-wrapper',
});

const editAvatarInput = new Input({
  type: INPUT_TYPE.FILE,
  className: 'profile-page__edit-avatar',
  label: {
    content: `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.447.233a2.305 2.305 0 0 0-1.635.685L.918 9.813l-.035.176-.616 3.093-.175.826.826-.175 3.094-.616.175-.035 8.895-8.894a2.292 2.292 0 0 0 0-3.27 2.304 2.304 0 0 0-1.635-.685Zm0 1.072c.284 0 .57.13.844.404.547.547.547
                1.14 0 1.688l-.404.386-1.67-1.67.386-.404c.275-.275.56-.404.844-.404Zm-2.021 1.6 1.67 1.67-6.803 6.801a3.832 3.832 0 0
                0-1.67-1.67l6.803-6.802ZM1.903 10.62a2.663 2.663 0 0 1 1.476 1.477l-1.846.369.37-1.846Z" fill="currentColor"/>
              </svg>`,
    className: 'profile-page__edit-avatar-label',
  },
  inputClassName: 'visually-hidden',
  accept: 'image/png',
  events: {
    change: {
      callback: onAvatarChange,
    },
  },
});

const userData = new ConnectedUserData({});

const toBackLink = new LinkWithRouter({
  className: 'profile-page__back',
  href: '/',
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

const exitLink = new Button({
  type: BUTTON_TYPE.BUTTON,
  content: 'Выйти',
  events: {
    click: {
      callback: onClick,
    },
  },
});

export class ProfilePage extends Block {
  constructor() {
    super(TAG_NAME.DIV, {
      avatar,
      editAvatarInput,
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
