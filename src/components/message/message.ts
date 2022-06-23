import {template} from './message.tmpl';
import {Block} from '../../core';
import {TAG_NAME} from '../../constants';

type Props = {
  className?: string;
  text?: string;
  time?: string;
};

export class Message extends Block<Props> {
  constructor(props: Props) {
    super(TAG_NAME.DIV, props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
