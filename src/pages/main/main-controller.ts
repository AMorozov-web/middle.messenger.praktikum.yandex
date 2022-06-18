import {authApi} from '../../api';
import {Router} from '../../core';
import {store} from '../../store';
import {getAvatarUrl} from '../../utils';

const router = Router.getInstance('#root');

export class MainController {
  public static checkAuth() {
    const {user} = store.getState();

    if (!user?.id) {
      authApi
        .getUser()
        .then((response) => {
          store.set('user', {...response, avatar: getAvatarUrl(response.avatar)});
        })
        .catch((error) => {
          console.log(error);
          router.go('/login');
        });
    }
  }
}
