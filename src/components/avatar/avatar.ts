import {template} from './avatar.tmpl';
import {Block} from '../../core';
import defaultImage from '../../../static/icons/image.svg';

type Props = {
  className?: string;
  src?: string;
  wrapperClassName?: string;
};

export class Avatar extends Block<Props> {
  constructor(props: Props) {
    const defaultProps: Props = {
      src: defaultImage,
    };

    super('div', {...defaultProps, ...props});
  }

  render() {
    return this.compile(template, this.props);
  }
}
