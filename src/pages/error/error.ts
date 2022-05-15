import {template} from './error.tmpl';
import {Block} from '../../core';
import {LinkWithRouter} from '../../components';
import {TAG_NAME} from '../../constants';

export class ErrorPage extends Block {
  constructor() {
    super(TAG_NAME.DIV, {
      error: {
        code: '404',
        description: 'Не туда попали',
      },
      children: new LinkWithRouter({
        className: 'error-page__back',
        href: -1,
        children: 'Назад',
      }),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
