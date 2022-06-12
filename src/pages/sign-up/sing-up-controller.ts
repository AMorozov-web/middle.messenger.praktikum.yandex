import {Router} from '../../core';
import {AuthApi, SignUpData} from '../../api';
import {store} from '../../store';

const router = Router.getInstance('#root');
const authApi = new AuthApi();

export class SignUpController {
  public static signUp(data: SignUpData) {
    authApi
      .signUp(data)
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
