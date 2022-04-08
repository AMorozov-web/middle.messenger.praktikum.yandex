import { get } from "./utils";

export default class Templator {
  PROPS_REGEXP = /{{(.*?)}}/gi;

  _template: string;

  constructor(template: string) {
    this._template = template;
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
            tmpl = tmpl.replace(new RegExp(key[0], "gi"), data.join(" "));
          }

          tmpl = tmpl.replace(new RegExp(key[0], "gi"), data as string);
        }
      }

      key = this.PROPS_REGEXP.exec(tmpl);
    }

    return tmpl;
  }

  compile<T extends Record<string, unknown>>(props?: T) {
    return this._compileTemplate(props);
  }
}
