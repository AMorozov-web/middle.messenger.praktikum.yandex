import {Block} from '../../core';
import {Button} from '../button';
import {TAG_NAME} from '../../constants';

type Props = {
  className?: string;
  addUserButton?: Button;
  deleteChatButton?: Button;
  onAddUser?: () => void;
  onDeleteChat?: () => void;
  icon?: string;
};

export class ChatActions extends Block<Props> {
  constructor(props: Props) {
    super(TAG_NAME.BUTTON, {
      onAddUser: undefined,
      onDeleteChat: undefined,
      ...props,
    });
  }

  render() {
    return this.compile(
      `<div class="{{className}}">
           {{icon}}
           <div class="chat-actions__container">
            <div class="chat-actions__tooltip">
              {{addUserButton}}
              {{deleteChatButton}}
            </div>
           </div>
         </div>`,
      this.props,
    );
  }
}
