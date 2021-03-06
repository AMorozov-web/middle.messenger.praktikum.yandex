import {template} from './avatar.tmpl';
import {Block} from '../../core';
import {connect} from '../../store';
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

    super('div', {...defaultProps, ...props, src: props.src ?? defaultImage});
  }

  render() {
    return this.compile(template, this.props);
  }
}

export const UserAvatar = connect(Avatar, (state) => {
  if (state.user?.avatar) {
    return {
      src: state.user.avatar,
    };
  }
  return {};
});
