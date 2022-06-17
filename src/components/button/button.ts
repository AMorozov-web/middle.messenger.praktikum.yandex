import {template} from './button.tmpl';
import {Block} from '../../core';
import {TAG_NAME} from '../../constants';

type Props = {
  className?: string;
  type?: ButtonType;
  content?: string;
} & CommonProps;

export class Button extends Block<Props> {
  constructor(props: Props) {
    super(TAG_NAME.BUTTON, props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
