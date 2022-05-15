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

  public use<T extends Block, P extends CommonProps>(
    path: string,
    component: new (props?: any) => T,
    componentProps?: P,
  ) {
    const route = new Route(path, component, {...componentProps, root: this._root});
    this.routes.push(route);
    return this;
  }

  public start() {
    window.addEventListener('popstate', (evt) =>
      this._onRoute((evt.currentTarget as Window).location.pathname),
    );
    this._onRoute(window.location.pathname);
  }

  public go(path: string | number) {
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

  public forward() {
    this.history.forward();
  }

  public back() {
    this.history.back();
  }

  private _onRoute(path: string) {
    const route = this._getRoute(path);

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

  private _getRoute(path: string) {
    return this.routes.find((route) => route.match(path));
  }
}
