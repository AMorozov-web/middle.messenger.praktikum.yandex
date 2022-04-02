import {get} from './utils';

class Templator {
  PROPS_REGEXP = /{{(.*?)}}/gi;

  constructor(template) {
    this._template = template;
  }

  _compileTemplate(props) {
    let tmpl = this._template;
    let key = null;

    while ((key = this.PROPS_REGEXP.exec(tmpl))) {
      if (key[1]) {
        const value = key[1].trim();
        const data = get(props, value);

        if (typeof data === 'function') {
          window[value] = data;
          tmpl = tmpl.replace(new RegExp(key[0], 'gi'), `window.${key[1].trim()}()`);
        } else {
          tmpl = tmpl.replace(new RegExp(key[0], 'gi'), data);
        }
      }
    }
    return tmpl;
  }

  compile(props) {
    return this._compileTemplate(props);
  }
}

export default Templator;
