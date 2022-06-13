import {Router} from '../../core';
import {authApi, SignInData} from '../../api';
import {store} from '../../store';

const router = Router.getInstance('#root');

export class LoginController {
  public static login(data: SignInData) {
    authApi
      .login(data)
      .then(() => authApi.getUser())
      .then((response) => {
        const userData = JSON.parse(response as string);

        store.set('user', {...userData, isAuthorized: true});

        router.go('/');
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
