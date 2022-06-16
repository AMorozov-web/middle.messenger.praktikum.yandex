import {authApi} from '../../api';
import {Router} from '../../core';
import {store} from '../../store';

const router = Router.getInstance('#root');

export class ProfileController {
  public static logout() {
    authApi
      .logout()
      .then(() => {
        store.set('user', null);
        router.go('/login');
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
