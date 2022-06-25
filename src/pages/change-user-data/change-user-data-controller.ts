import {Router} from '../../core';
import {userApi} from '../../api';
import {store} from '../../store';
import {getAvatarUrl} from '../../utils';

const router = Router.getInstance('#root');

export class ChangeUserDataController {
  public static changeUserData(data: UserData) {
    userApi
      .changeProfile(data)
      .then((response) => {
        const {user} = store.getState();

        store.set('user', {...user, ...response});

        router.go('/profile');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  public static changeAvatar(formData: FormData) {
    userApi
      .changeAvatar(formData)
      .then((response) => {
        const {user} = store.getState();

        store.set('user', {...user, ...response, avatar: getAvatarUrl(response.avatar)});
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
