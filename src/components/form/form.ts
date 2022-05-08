import {template} from './form.tmpl';
import {Block} from '../block';
import {TAG_NAME} from '../../constants';

type Props = {
  className: string;
  children: Block[];
  events?: Record<string, EventProps>;
};

export class Form extends Block<Props> {
  constructor(props: Props) {
    super(TAG_NAME.FORM, props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
