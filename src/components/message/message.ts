import {template} from './message.tmpl';
import {Block} from '../block';

type Props = {
  className?: string;
  text: string;
  time: string;
};

export class Message extends Block {
  constructor(props: Props) {
    super('div', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
