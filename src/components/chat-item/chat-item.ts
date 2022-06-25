import {template} from './chat-item.tmpl';
import {Avatar} from '../avatar';
import {Block} from '../../core';
import {TAG_NAME} from '../../constants';

type Props = {
  id?: number;
  avatar?: Avatar;
  lastMessage?: string;
  className?: string;
  title?: string;
  time?: string;
  unreadCount?: string;
  events?: Record<string, EventProps>;
};

export class ChatItem extends Block<Props> {
  constructor(props: Props) {
    const defaultProps = {
      className: '',
    };

    super(TAG_NAME.LI, {...defaultProps, ...props});
  }

  render() {
    return this.compile(template, this.props);
  }
}
