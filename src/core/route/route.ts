import {Block} from '..';
import {renderDOM} from '../../utils';

export class Route<T extends Block = Block> {
  private readonly _class: new (props?: any) => T;

  private readonly _path: string;

  private readonly _props: Record<string, any>;

  private _block: Nullable<T>;

  constructor(
    path: string,
    componentClass: new (props?: any) => T,
    componentProps: Record<string, unknown>,
  ) {
    this._class = componentClass;
    this._path = path;
    this._props = componentProps;
    this._block = null;
  }

  match(path: string) {
    return path === this._path;
  }

  navigate(path: string) {
    if (this.match(path)) {
      this._block?.show();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  render() {
    if (!this._block) {
      this._block = new this._class();
    }

    if (this._props.root) {
      const root = document.querySelector(this._props.root);

      if (root) {
        renderDOM(root, this._block);
      }
    }
  }
}
