import {HTTPTransport} from '../core';
import {BASE_URL} from '../constants';
import {USER_ENDPOINTS} from './endpoints';

type ChangeProfileData = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

type ChangePasswordData = {
  oldPassword: string;
  newPassword: string;
};

class UserApi {
  private transport: HTTPTransport;

  constructor() {
    this.transport = new HTTPTransport(BASE_URL);
  }

  changeProfile(data: ChangeProfileData) {
    return this.transport.post(USER_ENDPOINTS.PROFILE, {
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  changePassword(data: ChangePasswordData) {
    return this.transport.get(USER_ENDPOINTS.PASSWORD, {
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // changeAvatar() {
  //   return this.transport.post(USER_ENDPOINTS.AVATAR);
  // }
}

export const userApi = new UserApi();
