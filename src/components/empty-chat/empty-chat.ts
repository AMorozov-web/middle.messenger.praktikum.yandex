import {Block} from '../../core';
import {TAG_NAME} from '../../constants';

type Props = {
  text?: string;
};

const DEFAULT_MESSAGE = 'Выберите чат чтобы отправить сообщение';

export class EmptyChat extends Block<Props> {
  constructor(props: Props) {
    super(TAG_NAME.DIV, {
      text: props.text ?? DEFAULT_MESSAGE,
    });
  }

  render() {
    return this.compile('<div class="main-page__empty-chat">{{message}}</div>', this.props);
  }
}
