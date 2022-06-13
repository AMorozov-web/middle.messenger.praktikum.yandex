import {HTTPTransport} from '../core';
import {BASE_URL} from '../constants';
import {AUTH_ENDPOINTS} from './endpoints';

export type SignInData = {login: string; password: string};

export type SignUpData = Omit<UserData, 'id' | 'avatar'>;

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

  signUp(data: SignUpData): Promise<Pick<UserData, 'id'>> {
    return this.transport.post(AUTH_ENDPOINTS.SIGN_UP, {
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  getUser(): Promise<UserData> {
    return this.transport.get(AUTH_ENDPOINTS.GET_USER, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export const authApi = new AuthApi();
