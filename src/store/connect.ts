import {Block} from '../core';
import {store} from '.';
import {STORE_EVENTS} from '../constants';

const getProps = <T extends CommonProps>(props: T, mappedProps?: T): T => {
  return {
    ...props,
    ...mappedProps,
  };
};

export const connect = <P extends CommonProps>(
  Component: new (props: P) => Block<P>,
  mapStateToProps?: <T extends Indexed>(state: Indexed) => T,
) => {
  return class extends Component {
    constructor(props: P) {
      const newProps = getProps<P>(props, mapStateToProps?.<P>(store.getState()));
      super(newProps);

      // this.setProps({...mapStateToProps?.(store.getState())});
      store.on(STORE_EVENTS.UPDATED, () => {
        this.setProps({...mapStateToProps?.(store.getState())});
      });
    }
  };
};
