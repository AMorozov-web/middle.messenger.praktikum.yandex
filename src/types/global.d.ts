import {BUTTON_TYPE, INPUT_TYPE, TAG_NAME} from '../constants';

export {};

declare global {
  type Nullable<T> = T | null;

  type InputType = typeof INPUT_TYPE[keyof typeof INPUT_TYPE];
  type ButtonType = typeof BUTTON_TYPE[keyof typeof BUTTON_TYPE];
  type TagName = typeof TAG_NAME[keyof typeof TAG_NAME];

  type EventProps = {
    callback: (evt: Event) => void;
    capture?: boolean;
  };

  type CommonProps = Indexed & {
    events?: Record<string, EventProps>;
  };

  type Indexed<T = unknown> = {
    [key in string]: T;
  };

  type User = {
    id: number;
    first_name: string;
    second_name: string;
    display_name?: string;
    login: string;
    email: string;
    phone: string;
    avatar?: string;
  };

  type UserData = Omit<User, 'id' | 'avatar'>;

  type LastMessage = {
    user: Omit<User, 'display_name' | 'id'>;
    time: string;
    content: string;
  };

  type ChatShortInfo = {
    id: number;
    title: string;
    avatar: Nullable<string>;
    unread_count: number;
    created_by: number;
    last_message: Nullable<LastMessage>;
  };

  type ChatMessage = {
    id: number;
    is_read: boolean;
    chat_id: number;
    time: string;
    type: string;
    user_id: string | number;
    content: string;
    file?: Nullable<ChatFile>;
  };

  type ChatFile = {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
  };
}
