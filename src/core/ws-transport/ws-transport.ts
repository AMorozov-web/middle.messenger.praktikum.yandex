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

export const isArrayMessage = (data: unknown): data is ChatMessage[] =>
  Boolean(data) &&
  Array.isArray(data) &&
  data.every((item) => item.type === 'message' || item.type === 'file');

export const isSingleMessage = (data: unknown): data is ChatMessage =>
  Boolean(data) && isObject(data) && (data.type === 'message' || data.type === 'file');

export class WsTransport extends EventBus {
  private socket: WebSocket;

  timer: Nullable<NodeJS.Timeout>;

  private static TIMEOUT = 20000;

  constructor(params: {userId: number; chatId: number; token: string}) {
    const {userId, chatId, token} = params;

    super();
    this.timer = null;

    this.socket = new WebSocket(`${WS_BASE_URL}/${userId}/${chatId}/${token}`);

    this.socket.addEventListener('open', () => {
      const iteration = () => {
        this.ping();
        this.timer = setTimeout(iteration, WsTransport.TIMEOUT);
      };

      this.timer = setTimeout(iteration, WsTransport.TIMEOUT);

      this.get();
    });

    this.socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);

      if (isArrayMessage(data)) {
        store.set('messages', data);
      }

      if (isSingleMessage(data)) {
        this.get();
      }

      this.emit(WS_EVENTS.MESSAGE);
    });

    this.socket.addEventListener('error', (event) => {
      console.log('Error', event);
    });

    this.socket.addEventListener('close', () => {
      if (this.timer) {
        clearTimeout(this.timer);

        this.timer = null;
      }
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
