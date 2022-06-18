import {chatsApi} from '../../api';
import {store} from '../../store';

export class MainController {
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
}
