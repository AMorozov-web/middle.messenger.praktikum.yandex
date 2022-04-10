import {template} from './error.tmpl';
import {Block, Link} from '../../components';
import {renderDOM} from '../../utils';
import {TAG_NAME} from '../../constants';

type Props = {
  error: {
    code: string;
    description: string;
  };
  children: Link;
};

const toBackLink = new Link({
  className: 'error-page__back',
  href: './main.html',
  text: 'Назад',
});

class ErrorPage extends Block {
  constructor(props: Props) {
    super(TAG_NAME.DIV, props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

const allProps = {
  error: {
    code: '404',
    description: 'Не туда попали',
  },
  children: toBackLink,
};

const page = new ErrorPage(allProps);

const root = document.getElementById('root');

renderDOM(root, page);
