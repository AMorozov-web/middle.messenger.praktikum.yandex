import {Api, HTTPTransport} from '../core';
import {store} from '../store';
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

const authTransport = new HTTPTransport(BASE_URL);

export class AuthApi extends Api {
  login(data: SignInData) {
    return authTransport
      .post(AUTH_ENDPOINTS.LOGIN, {
        data,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        store.set('isUserAuthorized', true);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  logout() {
    return authTransport
      .post(AUTH_ENDPOINTS.LOGOUT, {
        data: {},
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        store.set('isUserAuthorized', false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  signUp(data: SignUpData) {
    return authTransport
      .post(AUTH_ENDPOINTS.LOGOUT, {
        data,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        store.set('userId', response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getUser() {
    return authTransport
      .post(AUTH_ENDPOINTS.GET_USER, {
        data: {},
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        const userData = JSON.parse(response as string);
        store.set('userData', userData);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
