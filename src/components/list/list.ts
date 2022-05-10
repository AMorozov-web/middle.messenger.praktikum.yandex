import {template} from './list.tmpl';
import {Block} from '../../core';
import {TAG_NAME} from '../../constants';

type Props = {
  className?: string;
  items: unknown[];
};

export class List extends Block<Props> {
  constructor(props: Props) {
    super(TAG_NAME.UL, props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
