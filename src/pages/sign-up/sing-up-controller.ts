import {AuthApi, SignUpData} from '../../api';

const authApi = new AuthApi();

export class SignUpController {
  public static signUp(data: SignUpData) {
    authApi.signUp(data);
  }
}
