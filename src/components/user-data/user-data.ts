import {template} from './user-data.tmpl';
import {Block} from '../../core';
import {EMPTY_VALUE_PLACEHOLDER, TAG_NAME} from '../../constants';
import {connect} from '../../store';

type Props = {
  email?: string;
  login?: string;
  firstName?: string;
  lastName?: string;
  nickName?: string;
  phone?: string;
};

export class UserData extends Block<Props> {
  constructor(props: Props) {
    super(TAG_NAME.DIV, props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export const ConnectedUserData = connect(UserData, (state) => {
  const {user} = state;

  if (user) {
    return {
      email: user.email,
      login: user.login,
      firstName: user.first_name,
      lastName: user.second_name,
      nickName: user.display_name ?? EMPTY_VALUE_PLACEHOLDER,
      phone: user.phone,
    };
  }
  return {};
});
