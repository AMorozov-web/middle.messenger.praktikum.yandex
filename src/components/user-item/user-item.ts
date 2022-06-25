import {template} from './user-item.tmpl';
import {Block} from '../../core';
import {Button} from '..';
import {TAG_NAME} from '../../constants';

type Props = {
  className?: string;
  button?: Button;
  userName?: string;
  userLogin?: string;
  events?: Record<string, EventProps>;
};

export class UserItem extends Block<Props> {
  constructor(props: Props) {
    const defaultProps = {
      className: '',
    };

    super(TAG_NAME.LI, {...defaultProps, ...props});
  }

  render() {
    return this.compile(template, this.props);
  }
}
