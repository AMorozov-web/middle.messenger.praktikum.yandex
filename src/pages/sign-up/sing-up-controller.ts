import {Router} from '../../core';
import {authApi} from '../../api';
import {store} from '../../store';
import {getAvatarUrl} from '../../utils';

const router = Router.getInstance('#root');

export class SignUpController {
  public static signUp(data: UserData) {
    authApi
      .signUp(data)
      .then(() => authApi.getUser())
      .then((response) => {
        store.set('user', {...response, avatar: getAvatarUrl(response.avatar)});

        router.go('/');
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
