import {Router} from './core';
import {
  MainPage,
  SignUpPage,
  ProfilePage,
  LoginPage,
  ErrorPage,
  ChangeUserPasswordPage,
  ChangeUserDataPage,
} from './pages';
import {authApi, chatsApi} from './api';
import {store} from './store';
import {getAvatarUrl} from './utils';

const router = Router.getInstance('#root');

router
  .use('/', MainPage)
  .use('/login', LoginPage)
  .use('/sign-up', SignUpPage)
  .use('/profile', ProfilePage)
  .use('/error', ErrorPage)
  .use('/change-password', ChangeUserPasswordPage)
  .use('/change-profile', ChangeUserDataPage)
  .start();

authApi // возможно стоит это делать в контроллере
  .getUser()
  .then((response) => {
    store.set('user', {...response, avatar: getAvatarUrl(response.avatar)});

    if (location.pathname !== '/') {
      router.go('/');
    }
  })
  .then(() => {
    chatsApi.getChats().then((response) => {
      store.set('chats', response);
    });
  })
  .catch((error) => {
    console.log(error);

    const {user} = store.getState();

    if (!user?.id) {
      router.go('/login');
    }
  });
