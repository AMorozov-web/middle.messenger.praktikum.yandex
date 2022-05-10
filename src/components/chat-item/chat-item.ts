import {template} from './chat-item.tmpl';
import {Avatar} from '../avatar';
import {Block} from '../../core';
import {TAG_NAME} from '../../constants';

type Props = {
  avatar: Avatar;
  lastMessage: string;
  userName: string;
  time: string;
  newMessagesCount: string;
};

export class ChatItem extends Block<Props> {
  constructor(props: Props) {
    super(TAG_NAME.LI, props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
