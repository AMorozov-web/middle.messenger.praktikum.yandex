import {template} from './link.tmpl';
import {Block} from '../block';
import {TAG_NAME} from '../../constants';

type Props = {
  className?: string;
  href?: string;
  text: string;
};

export class Link extends Block {
  constructor(props: Props) {
    super(TAG_NAME.A, props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
