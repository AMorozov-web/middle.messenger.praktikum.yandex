import {template} from './link.tmpl';
import {Block, PropsWithRouter, withRouter} from '../../core';
import {TAG_NAME} from '../../constants';

type Props = PropsWithRouter & {
  className?: string;
  href: string | number;
  children: string;
  events?: Record<string, EventProps>;
};

class Link extends Block<Props> {
  constructor(props: Props) {
    super(TAG_NAME.A, {
      ...props,
      events: {
        click: {
          callback: (evt) => {
            evt.preventDefault();
            props.router.go(props.href);
          },
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export const LinkWithRouter = withRouter<Props>(Link);
