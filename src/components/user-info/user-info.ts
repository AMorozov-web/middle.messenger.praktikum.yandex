import {template} from './user-info.tmpl';
import {Avatar} from '../avatar';
import {Button} from '../button';
import {Block} from '../block';
import {TAG_NAME} from '../../constants';

type Props = {
  avatar: Avatar;
  button: Button;
  userName: string;
};

export class UserInfo extends Block {
  constructor(props: Props) {
    super(TAG_NAME.DIV, props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
