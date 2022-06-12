import {Router} from '../../core';
import {AuthApi, SignInData} from '../../api';
import {store} from '../../store';

const router = Router.getInstance('#root');
const authApi = new AuthApi();

export class LoginController {
  public static login(data: SignInData) {
    authApi
      .login(data)
      .then(() => authApi.getUser())
      .then((response) => {
        const userData = JSON.parse(response as string);

        store.set('userData', userData);
        store.set('isUserAuthorized', true);

        router.go('/');
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
