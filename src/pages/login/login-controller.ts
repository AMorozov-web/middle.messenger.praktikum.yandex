import {AuthApi, SignInData} from '../../api';

const authApi = new AuthApi();

export class LoginController {
  public static login(data: SignInData) {
    authApi.login(data);
  }
}
