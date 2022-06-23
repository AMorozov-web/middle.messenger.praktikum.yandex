import {template} from './chat-day-item.tmpl';
import {Block} from '../../core';
import {List, Message} from '..';
import {TAG_NAME} from '../../constants';

type Props = {
  className?: string;
  dayTitle?: string;
  messagesList?: List;
  messages?: Message[];
};

export class ChatDayItem extends Block<Props> {
  constructor(props: Props) {
    super(TAG_NAME.LI, {
      dayTitle: '',
      className: '',
      messagesList: new List({className: 'day__messages-list', items: []}),
      ...props,
    });
  }

  componentDidMount() {
    if (this.props.messages?.length) {
      this.props.messagesList?.setProps({items: this.props.messages});
    }
  }

  render() {
    return this.compile(template, this.props);
  }
}
