import {Block} from '../core';
import {RootState, store} from '.';
import {STORE_EVENTS} from '../constants';

const getProps = <T extends CommonProps>(props: T, mappedProps?: T): T => {
  return {
    ...props,
    ...mappedProps,
  };
};

export const connect = <P extends CommonProps>(
  Component: new (props: P) => Block<P>,
  mapStateToProps: (state: RootState) => P,
) => {
  return class extends Component {
    constructor(props: P) {
      const newProps = getProps<P>(props, mapStateToProps(store.getState()));
      super(newProps);

      // this.setProps(newProps); // возможно нужно убрать

      store.on(STORE_EVENTS.UPDATED, () => {
        const mappedProps = mapStateToProps(store.getState());

        this.setProps(mappedProps);
      });
    }
  };
};
