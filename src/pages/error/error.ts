import {template} from './error.tmpl';
import {Block} from '../../core';
import {Link} from '../../components';
import {renderDOM} from '../../utils';
import {TAG_NAME} from '../../constants';

class ErrorPage extends Block {
  constructor() {
    super(TAG_NAME.DIV, {
      error: {
        code: '404',
        description: 'Не туда попали',
      },
      children: new Link({
        className: 'error-page__back',
        href: './main.html',
        text: 'Назад',
      }),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

const page = new ErrorPage();

const root = document.getElementById('root');

renderDOM(root, page);
