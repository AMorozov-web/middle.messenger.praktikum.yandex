import {template} from './error.tmpl';
import {Block} from '../../core';
import {Link} from '../../components';
import {TAG_NAME} from '../../constants';

export class ErrorPage extends Block {
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
