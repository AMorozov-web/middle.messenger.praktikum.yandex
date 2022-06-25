import {HTTPTransport} from '../core';
import {BASE_URL} from '../constants';
import {AUTH_ENDPOINTS} from './endpoints';

export type SignInData = {login: string; password: string};

export type UserId = Pick<User, 'id'>;

class AuthApi {
  private transport: HTTPTransport;

  constructor() {
    this.transport = new HTTPTransport(BASE_URL);
  }

  login(data: SignInData): Promise<void> {
    return this.transport.post(AUTH_ENDPOINTS.LOGIN, {
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  logout(): Promise<void> {
    return this.transport.post(AUTH_ENDPOINTS.LOGOUT);
  }

  signUp(data: UserData): Promise<UserId> {
    return this.transport
      .post<string>(AUTH_ENDPOINTS.SIGN_UP, {
        data,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => JSON.parse(response));
  }

  getUser(): Promise<User> {
    return this.transport
      .get<string>(AUTH_ENDPOINTS.GET_USER, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => JSON.parse(response));
  }
}

export const authApi = new AuthApi();
