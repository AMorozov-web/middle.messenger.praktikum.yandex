import {HTTPTransport} from '../core';
import {USER_ENDPOINTS} from './endpoints';
import {BASE_URL} from '../constants';

export type ChangePasswordData = {
  oldPassword: string;
  newPassword: string;
};

class UserApi {
  private transport: HTTPTransport;

  constructor() {
    this.transport = new HTTPTransport(BASE_URL);
  }

  changeProfile(data: UserData): Promise<User> {
    return this.transport
      .put<string>(USER_ENDPOINTS.PROFILE, {
        data,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => JSON.parse(response));
  }

  changePassword(data: ChangePasswordData): Promise<void> {
    return this.transport.put(USER_ENDPOINTS.PASSWORD, {
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  changeAvatar(formData: FormData): Promise<User> {
    return this.transport
      .put<string>(USER_ENDPOINTS.AVATAR, {
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => JSON.parse(response));
  }

  getById(id: number): Promise<User> {
    return this.transport
      .get<string>(`/user/${id}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => JSON.parse(response));
  }

  searchByLogin(login: string): Promise<User[]> {
    return this.transport
      .post<string>(USER_ENDPOINTS.SEARCH, {
        data: {login},
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => JSON.parse(response));
  }
}

export const userApi = new UserApi();
