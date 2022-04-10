import {template} from './input.tmpl';
import {Block} from '../block';
import {INPUT_TYPE, TAG_NAME} from '../../constants';

type Props = {
  className?: string;
  events?: Record<string, EventProps>;
  id?: string;
  inputClassName?: string;
  label?: {
    className?: string;
    text?: string;
  };
  name?: string;
  type?: InputType;
  validation?: {
    minLength?: number;
    maxLength?: number;
    required?: boolean;
  };
};

const DEFAULT_INPUT_CLASSNAME = 'input';
const DEFAULT_LABEL_CLASSNAME = 'input__label';

export class Input extends Block {
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