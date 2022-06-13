import {HTTPTransport} from '../core';
import {BASE_URL} from '../constants';
import {AUTH_ENDPOINTS} from './endpoints';

export type SignInData = {login: string; password: string};

export type SignUpData = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

class AuthApi {
  private transport: HTTPTransport;

  constructor() {
    this.transport = new HTTPTransport(BASE_URL);
  }

  login(data: SignInData) {
    return this.transport.post(AUTH_ENDPOINTS.LOGIN, {
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  logout() {
    return this.transport.post(AUTH_ENDPOINTS.LOGOUT);
  }

  signUp(data: SignUpData) {
    return this.transport.post(AUTH_ENDPOINTS.SIGN_UP, {
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  getUser() {
    return this.transport.get(AUTH_ENDPOINTS.GET_USER, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export const authApi = new AuthApi();
