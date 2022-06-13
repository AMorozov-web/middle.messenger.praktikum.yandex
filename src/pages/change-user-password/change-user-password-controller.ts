import {Router} from '../../core';
import {ChangePasswordData, userApi} from '../../api';

const router = Router.getInstance('#root');

export class ChangeUserPasswordController {
  public static changeUserPassword(data: ChangePasswordData) {
    userApi
      .changePassword(data)
      .then(() => {
        router.go('/profile');
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
