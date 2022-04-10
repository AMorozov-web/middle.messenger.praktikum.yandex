import {template} from './list.tmpl';
import {Block} from '../block';
import {TAG_NAME} from '../../constants';

type Props = {
  className?: string;
  items: unknown[];
};

export class List extends Block {
  constructor(props: Props) {
    super(TAG_NAME.UL, props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
