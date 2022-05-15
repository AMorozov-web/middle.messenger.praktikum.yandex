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

  type CommonProps = Record<string, unknown> & {
    events?: Record<string, EventProps>;
  };

  type Indexed<T = unknown> = {
    [key in string]: T;
  };
}
