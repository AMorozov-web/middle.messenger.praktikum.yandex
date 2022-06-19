import {template} from './input.tmpl';
import {Block} from '../../core';
import {connect} from '../../store';
import {INPUT_TYPE, TAG_NAME} from '../../constants';

type Props = {
  className?: string;
  events?: Record<string, EventProps>;
  placeholder?: string;
  dataTestId?: string;
  pattern?: string;
  id?: string;
  inputClassName?: string;
  label?: {
    className?: string;
    content?: string;
  };
  name?: string;
  value?: string;
  type?: InputType;
  accept?: string;
  validation?: {
    minLength?: number;
    maxLength?: number;
    required?: boolean;
  };
};

const DEFAULT_INPUT_CLASSNAME = 'input';
const DEFAULT_LABEL_CLASSNAME = 'input__label';

export class Input extends Block<Props> {
  constructor(props: Props) {
    const defaultProps: Props = {
      inputClassName: DEFAULT_INPUT_CLASSNAME,
      label: {
        className: DEFAULT_LABEL_CLASSNAME,
      },
      type: INPUT_TYPE.TEXT,
    };

    super(TAG_NAME.LABEL, {...defaultProps, ...props});
  }

  render() {
    return this.compile(template, this.props);
  }
}

export const UserEmailInput = connect(Input, (state) => ({
  value: state?.user?.email ?? '',
}));

export const UserLoginInput = connect(Input, (state) => ({
  value: state?.user?.login ?? '',
}));

export const UserFirstNameInput = connect(Input, (state) => ({
  value: state?.user?.first_name ?? '',
}));

export const UserSecondNameInput = connect(Input, (state) => ({
  value: state?.user?.second_name ?? '',
}));

export const UserNickNameInput = connect(Input, (state) => ({
  value: state?.user?.display_name ?? '',
}));

export const UserPhoneInput = connect(Input, (state) => ({
  value: state?.user?.phone ?? '',
}));
