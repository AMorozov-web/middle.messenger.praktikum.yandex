import {Block} from '..';
import {Route} from './route';

export class Router {
  private static instance: Router;

  private readonly _root: string;

  private _currentRoute: Nullable<Route>;

  private history: History;

  private routes: Route[];

  private constructor(root: string) {
    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._root = root;
  }

  public static getInstance(root: string) {
    if (!Router.instance) {
      Router.instance = new Router(root);
    }

    return Router.instance;
  }

  private _onRoute(path: string) {
    const route = this.getRoute(path);

    if (!route) {
      return;
    }

    if (this._currentRoute && !this._currentRoute.match(path)) {
      this._currentRoute.leave();
    }

    if (route) {
      this._currentRoute = route;
      route.render();
    }
  }

  use<T extends Block, P extends CommonProps>(
    path: string,
    component: new (props?: any) => T,
    componentProps?: P,
  ) {
    const route = new Route(path, component, {...componentProps, root: this._root});
    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = (evt) => this._onRoute((evt.currentTarget as Window).location.pathname);
    this._onRoute(window.location.pathname);
  }

  go(path: string | number) {
    if (typeof path === 'number') {
      if (path === 1) {
        this.forward();
      }
      if (path === -1) {
        this.back();
      }
    } else {
      this.history.pushState({}, '', path);
      this._onRoute(path);
    }
  }

  forward() {
    this.history.forward();
  }

  back() {
    this.history.back();
  }

  getRoute(path: string) {
    return this.routes.find((route) => route.match(path));
  }
}
