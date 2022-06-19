import {HTTPTransport} from '../core';
import {BASE_URL} from '../constants';

class ChatsApi {
  httpTransport: HTTPTransport;

  constructor() {
    this.httpTransport = new HTTPTransport(BASE_URL);
  }

  getChats(data?: {offset?: number; limit?: number; title?: string}): Promise<ChatShortInfo[]> {
    return this.httpTransport
      .get<string>('/chats', {
        data,
        headers: {
          accept: 'application/json',
        },
      })
      .then((response) => JSON.parse(response));
  }

  createChat(data: {title: string}): Promise<void> {
    return this.httpTransport.post('/chats', {
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  getChatUsers(chatId: number): Promise<User[]> {
    return this.httpTransport.get<string>(`/chats/${chatId}/users`).then((response) => {
      const users: User[] = JSON.parse(response);
      return users.map((user: User) => ({
        ...user,
        avatar: user.avatar ? `${BASE_URL}/resources${user.avatar}` : undefined,
      }));
    });
  }

  getNewMessagesCount(id: number): Promise<number> {
    return this.httpTransport
      .get<string>(`/chats/new/${id}`)
      .then((response) => JSON.parse(response));
  }

  addUserToChat(userId: number, chatId: number): Promise<void> {
    return this.httpTransport.put('/chats/users', {
      data: {
        users: [userId],
        chatId,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  getToken(id: number): Promise<string> {
    return this.httpTransport
      .post<string>(`/chats/token/${id}`)
      .then((response) => JSON.parse(response).token);
  }
}

export const chatsApi = new ChatsApi();
