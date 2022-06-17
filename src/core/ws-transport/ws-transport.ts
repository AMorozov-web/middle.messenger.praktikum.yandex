import {EventBus} from '..';
import {store} from '../../store';
import {isObject} from '../../utils';
import {WS_BASE_URL, WS_EVENTS} from '../../constants';

type ChatFile = {
  id: number;
  user_id: number;
  path: string;
  filename: string;
  content_type: string;
  content_size: number;
  upload_date: string;
};

export type ChatMessage = {
  id: number;
  is_read: boolean;
  chat_id: number;
  time: string;
  type: string;
  user_id: string | number;
  content: string;
  file?: Nullable<ChatFile>;
};

export const isArrayMessageData = (data: unknown): data is ChatMessage[] =>
  Array.isArray(data) && data.every((item) => item.type === 'message' || item.type === 'file');

export const isMessageData = (data: unknown): data is ChatMessage =>
  isObject(data) && (data.type === 'message' || data.type === 'file');

export class WsTransport extends EventBus {
  private socket: WebSocket;

  timer: number | null;

  constructor(params: {userId: number; chatId: number; token: string}) {
    const {userId, chatId, token} = params;

    super();
    this.timer = null;

    this.socket = new WebSocket(`${WS_BASE_URL}/${userId}/${chatId}/${token}`);

    this.socket.addEventListener('open', () => {
      console.log('Connection open');
      this.get();
    });

    this.socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);

      if (isArrayMessageData(data)) {
        store.set('chat.messages', data);
      }

      if (isMessageData(data)) {
        this.get();
      }
      this.emit(WS_EVENTS.MESSAGE);
    });

    this.socket.addEventListener('error', (event) => {
      console.log('Error', event);
    });

    this.socket.addEventListener('close', (event) => {
      console.log('Connection closed', event.reason);
    });
  }

  send(message: string) {
    this.socket.send(
      JSON.stringify({
        type: 'message',
        content: message,
      }),
    );
  }

  get(offset = 0) {
    this.socket.send(
      JSON.stringify({
        content: `${offset}`,
        type: 'get old',
      }),
    );
  }

  ping() {
    this.timer = setTimeout(() => this.ping(), 2000);

    this.socket.send(
      JSON.stringify({
        type: 'ping',
      }),
    );
  }

  close() {
    this.socket.close();
  }
}
