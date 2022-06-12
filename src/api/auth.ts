import {Api, HTTPTransport} from '../core';
import {store} from '../store';
import {BASE_URL} from '../constants';

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
      .post('/auth/signin', {
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
      .post('/auth/logout', {
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
      .post('/auth/signup', {
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
}
