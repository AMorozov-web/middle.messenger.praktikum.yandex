import {template} from './button.tmpl';
import {Block} from '../block';
import {TAG_NAME} from '../../constants';

type Props = {
  className?: string;
  type: ButtonType;
  text: string;
};

export class Button extends Block {
  constructor(props: Props) {
    super(TAG_NAME.BUTTON, props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
