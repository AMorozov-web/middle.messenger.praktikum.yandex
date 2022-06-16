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
        const {user} = store.getState();

        store.set('user', {...user, ...JSON.parse(response)});

        router.go('/');
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
