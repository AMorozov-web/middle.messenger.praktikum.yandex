import {template} from './message.tmpl';
import {Block} from '../block';
import {TAG_NAME} from '../../constants';

type Props = {
  className?: string;
  text: string;
  time: string;
};

export class Message extends Block {
  constructor(props: Props) {
    super(TAG_NAME.DIV, props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
