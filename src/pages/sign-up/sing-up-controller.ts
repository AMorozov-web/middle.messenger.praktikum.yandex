import {Router} from '../../core';
import {authApi, SignUpData} from '../../api';
import {store} from '../../store';

const router = Router.getInstance('#root');

export class SignUpController {
  public static signUp(data: SignUpData) {
    authApi
      .signUp(data)
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
