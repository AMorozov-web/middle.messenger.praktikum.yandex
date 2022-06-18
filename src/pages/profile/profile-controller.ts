import {authApi} from '../../api';
import {Router} from '../../core';
import {store} from '../../store';

const router = Router.getInstance('#root');

export class ProfileController {
  public static logout() {
    authApi
      .logout()
      .then(() => {
        router.go('/login');
        store.set('user', null);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
