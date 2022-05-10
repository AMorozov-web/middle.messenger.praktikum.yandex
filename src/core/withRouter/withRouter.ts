import {Block} from '..';
import {Router} from '../router';

export type PropsWithRouter = {
  router: Router;
};

type PropsWithoutRouter<T extends CommonProps> = Omit<T, 'router'>;

type Component<T = object> = new (...args: any[]) => T;

export const withRouter = <P extends CommonProps, T extends Component = Component>(component: T) =>
  class WithRouter extends component {
    constructor(...args: any[]) {
      const [props] = args;
      super({...props, router: Router.getInstance('#root')});
    }
  } as new (props: PropsWithoutRouter<P>) => Block<PropsWithoutRouter<P>>;
