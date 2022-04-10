import {template} from './chat-item.tmpl';
import {Avatar} from '../avatar';
import {Block} from '../block';
import {TAG_NAME} from '../../constants';

type Props = {
  avatar: Avatar;
  lastMessage: string;
  name: string;
  time: string;
  newMessagesCount: string;
};

export class ChatItem extends Block {
  constructor(props: Props) {
    super(TAG_NAME.LI, props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
