import {Router} from '../../core';
import {authApi, ChangeProfileData, userApi} from '../../api';
import {store} from '../../store';

const router = Router.getInstance('#root');

export class ChangeUserDataController {
  public static changeUserData(data: ChangeProfileData) {
    userApi
      .changeProfile(data)
      .then(() => authApi.getUser())
      .then((response) => {
        const {user} = store.getState();

        store.set('user', {...user, ...JSON.parse(response)});

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

        store.set('user', {...user, ...JSON.parse(response)});
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
