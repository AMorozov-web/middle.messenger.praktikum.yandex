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
