import {template} from './chat-info.tmpl';
import {Avatar} from '../avatar';
import {Button} from '../button';
import {Block} from '../../core';
import {TAG_NAME} from '../../constants';
import {getAvatarUrl} from '../../utils';

type Props = {
  avatar?: Avatar;
  button?: Button;
  currentChat?: ChatShortInfo;
  chatName?: string;
};

export class ChatInfo extends Block<Props> {
  constructor(props: Props) {
    super(TAG_NAME.DIV, {
      ...props,
      chatName: props.currentChat?.title ?? '',
      avatar: new Avatar({
        wrapperClassName: 'main-page__chat-avatar',
        src: props.currentChat?.avatar ? getAvatarUrl(props.currentChat.avatar) : undefined,
      }),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
