import jsdom from 'jsdom';
import {expect} from 'chai';
import {Block, Route, Router} from '..';
import {TAG_NAME} from '../../constants';

const {JSDOM} = jsdom;

class TestBlock extends Block {
  constructor() {
    super(TAG_NAME.DIV, {});
  }

  render() {
    return this.compile('<div>test</div', {});
  }
}

describe('Router test', () => {
  const dom = new JSDOM('<!DOCTYPE html><div id="root"></div>', {
    url: 'https://my-url.com/',
  });

  global.window = dom.window as unknown as Window & typeof globalThis; // Другого варианта использования не нашел
  global.document = dom.window.document;

  it('Router is a Singleton pattern', () => {
    expect(Router.getInstance('#root')).to.equal(Router.getInstance('#root'));
  });

  it('Router register routes correctly', () => {
    const router = Router.getInstance('#root');

    router.use('/path0', TestBlock).use('/path1', TestBlock).start();
    expect(router.routes).to.be.an('array').that.length(2);
    expect(router.routes[0]).to.be.an.instanceof(Route);
    expect(router.routes[1]).to.be.an.instanceof(Route);
  });

  it('Router working correctly with location and history', () => {
    const router = Router.getInstance('#root');

    router.go('/path0');

    expect(global.window.location.pathname).to.equal('/path0');
    expect(global.window.history.length).to.equal(2);
  });
});
