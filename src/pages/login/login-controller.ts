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
        const {user} = store.getState();

        store.set('user', {...user, ...JSON.parse(response)});

        router.go('/');
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
