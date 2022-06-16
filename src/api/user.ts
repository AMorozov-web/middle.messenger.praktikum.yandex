import {HTTPTransport} from '../core';
import {BASE_URL} from '../constants';
import {USER_ENDPOINTS} from './endpoints';

export type ChangeProfileData = Omit<User, 'id' | 'avatar' | 'isAuthorized'>;

export type ChangePasswordData = {
  oldPassword: string;
  newPassword: string;
};

class UserApi {
  private transport: HTTPTransport;

  constructor() {
    this.transport = new HTTPTransport(BASE_URL);
  }

  changeProfile(data: ChangeProfileData): Promise<string> {
    return this.transport.put(USER_ENDPOINTS.PROFILE, {
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  changePassword(data: ChangePasswordData): Promise<void> {
    return this.transport.put(USER_ENDPOINTS.PASSWORD, {
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  changeAvatar(formData: FormData): Promise<string> {
    return this.transport.put(USER_ENDPOINTS.AVATAR, {
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}

export const userApi = new UserApi();
