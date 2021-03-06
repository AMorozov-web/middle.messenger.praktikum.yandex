import {Router} from '../../core';
import {authApi, chatsApi, SignInData} from '../../api';
import {store} from '../../store';
import {getAvatarUrl} from '../../utils';

const router = Router.getInstance('#root');

export class LoginController {
  public static checkAuth() {
    const {user} = store.getState();

    if (user?.id) {
      router.go('/');
    }
  }

  public static login(data: SignInData) {
    authApi
      .login(data)
      .then(() => authApi.getUser())
      .then((response) => {
        store.set('user', {...response, avatar: getAvatarUrl(response.avatar)});
        chatsApi.getChats().then((chats) => {
          store.set('chats', chats);
        });

        router.go('/');
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
