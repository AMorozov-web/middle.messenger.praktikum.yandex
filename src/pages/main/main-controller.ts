import {chatsApi, userApi} from '../../api';
import {store} from '../../store';
import {WsTransport} from '../../core';
import {WS_EVENTS} from '../../constants';

export class MainController {
  static wsTransport: WsTransport | null;

  public static createChat(title: string, onSuccess?: () => void): Promise<void> {
    return new Promise((resolve) => {
      chatsApi
        .createChat({title})
        .then(() => {
          chatsApi.getChats().then((response) => {
            store.set('chats', response);
            resolve(onSuccess?.());
          });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  public static getChats(data?: {offset?: number; limit?: number; title?: string}): void {
    chatsApi
      .getChats(data)
      .then((response) => {
        store.set('chats', response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  public static selectChat(chat: ChatShortInfo): void {
    store.set('currentChat', chat); // after select need load messages here

    if (this.wsTransport) {
      this.wsTransport = null;
    }

    this.getChatToken(chat.id).then((token) => {
      const {user} = store.getState();

      if (user?.id) {
        this.wsTransportInit(user.id, chat.id, token);
      }
    });
  }

  public static deleteChat(id: number): void {
    chatsApi
      .deleteChat(id)
      .then(() => {
        chatsApi.getChats().then((response) => {
          store.set('currentChat', null);
          store.set('chats', response);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  public static searchByLogin(login: string): void {
    userApi
      .searchByLogin(login)
      .then((response) => {
        if (store.getState().searchResult.length) {
          store.set('searchResult', []);
        }
        store.set('searchResult', response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  public static addUserToChat(userId: number, chatId: number, onSuccess?: () => void): void {
    chatsApi
      .addUserToChat(userId, chatId)
      .then(() => {
        onSuccess?.();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  static getChatToken(chatId: number): Promise<string> {
    return chatsApi.getToken(chatId);
  }

  static wsTransportInit(userId: number, chatId: number, token: string) {
    this.wsTransport = new WsTransport({userId, chatId, token});
    this.wsTransport?.on(WS_EVENTS.MESSAGE, this.getChats.bind(this));
  }

  public static sendMessage(message: string) {
    if (!this.wsTransport) {
      throw new Error('Chat has to be selected');
    }

    this.wsTransport.send(message);
  }

  public static getMessages() {
    if (!this.wsTransport) {
      throw new Error('Chat has to be selected');
    }

    this.wsTransport.get();
  }
}
