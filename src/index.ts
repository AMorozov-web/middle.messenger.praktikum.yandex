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
import {authApi} from './api';
import {store} from './store';

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

authApi
  .getUser()
  .then((response) => {
    store.set('user', {...JSON.parse(response), isAuthorized: true});
  })
  .catch((error) => {
    console.log(error);
    router.go('/login');
  });
