import {Router} from '../../core';
import {authApi, SignInData} from '../../api';
import {store} from '../../store';
import {getAvatarUrl} from '../../utils';

const router = Router.getInstance('#root');

export class LoginController {
  public static login(data: SignInData) {
    authApi
      .login(data)
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
