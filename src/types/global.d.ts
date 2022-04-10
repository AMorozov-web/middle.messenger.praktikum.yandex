import {BUTTON_TYPE, INPUT_TYPE} from '../constants';

export {};

declare global {
  type Nullable<T> = T | null;

  type InputType = typeof INPUT_TYPE[keyof typeof INPUT_TYPE];
  type ButtonType = typeof BUTTON_TYPE[keyof typeof BUTTON_TYPE];

  type EventProps = {
    callback: (evt: Event) => void;
    capture?: boolean;
  };

  type CommonProps = {
    events?: Record<string, EventProps>;
    [key: string]: unknown;
  };
}
