import {get} from '../utils';

export class Templator {
  PROPS_REGEXP = /{{(.*?)}}/gi;

  EMPTY_PROPS_REGEXP = /\S+undefined[\S]?\s?/gi;

  _template: string;

  constructor(template: string) {
    this._template = template;
  }

  compile<T extends Record<string, unknown>>(props?: T) {
    return this._compileTemplate(props);
  }

  _compileTemplate<T extends Record<string, unknown>>(props?: T) {
    let tmpl = this._template;
    let key: RegExpExecArray | null = this.PROPS_REGEXP.exec(tmpl);

    while (key) {
      if (key && key[1]) {
        const value = key[1].trim();

        if (props) {
          const data = get(props, value);

          if (Array.isArray(data)) {
            tmpl = tmpl.replace(new RegExp(key[0], 'gi'), data.join(' '));
          }

          tmpl = tmpl.replace(new RegExp(key[0], 'gi'), data as string);
        }
      }
      this.PROPS_REGEXP.lastIndex = key.index;
      key = this.PROPS_REGEXP.exec(tmpl);
    }

    return this._removeEmpty(tmpl);
  }

  // В дальнейшем перенести логику метода _removeEmpty внутрь _compileTemplate
  _removeEmpty(template: string) {
    let tmpl = template;
    let key: RegExpExecArray | null = this.EMPTY_PROPS_REGEXP.exec(template);

    while (key) {
      if (key) {
        tmpl = tmpl.replace(new RegExp(key[0], 'gi'), '');

        this.EMPTY_PROPS_REGEXP.lastIndex = key.index;
        key = this.EMPTY_PROPS_REGEXP.exec(tmpl);
      }
    }

    return tmpl;
  }
}
