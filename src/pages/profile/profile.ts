import {template} from './profile.tmpl';
import {Avatar, Block, Link} from '../../components';
import {renderDOM} from '../../utils';
import {TAG_NAME} from '../../constants';

type Props = {
  avatar: Avatar;
  email: string;
  login: string;
  firstName: string;
  lastName: string;
  nickName: string;
  phone: string;
  toBackLink: Link;
  changeDataLink: Link;
  changePasswordLink: Link;
  exitLink: Link;
};

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

class ProfilePage extends Block {
  constructor(props: Props) {
    super(TAG_NAME.DIV, props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

const allProps = {
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
};

const page = new ProfilePage(allProps);

const root = document.getElementById('root');

renderDOM(root, page);
