import {v4 as getId} from 'uuid';
import {EventBus} from '..';
import {cloneObject, Templator} from '../../utils';

export type Children = Record<string, Block | Block[]>;

type BlockMeta = {
  tagName: string;
  props: CommonProps;
};

export abstract class Block<T extends CommonProps = CommonProps> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  children: Children;

  eventBus: () => EventBus;

  props: CommonProps;

  private _element: HTMLElement | null;

  private readonly _id: string | null;

  private readonly _meta: BlockMeta;

  protected constructor(tagName: TagName, allProps: T) {
    const eventBus = new EventBus();

    const {props, children} = this._getChildren(allProps);

    this._element = null;
    this._id = getId();
    this._meta = {
      tagName,
      props,
    };
    this._registerEvents(eventBus);

    this.children = children;

    this.eventBus = () => eventBus;

    this.props = this._makePropsProxy({...allProps, _id: this._id});

    eventBus.emit(Block.EVENTS.INIT);
  }

  public componentDidMount() {}

  public dispatchComponentDidMount() {}

  public init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  public setProps = (nextProps: object) => {
    if (!nextProps) {
      return;
    }

    this._removeEvents();

    this.props = {...this.props, ...nextProps};
    this.eventBus().emit(Block.EVENTS.FLOW_CDU);
  };

  public render(): DocumentFragment {
    return new DocumentFragment();
  }

  public getContent() {
    return this._element;
  }

  public show() {
    const element = this.getContent();
    if (element) {
      element.style.display = 'block';
    }
  }

  public hide() {
    const element = this.getContent();
    if (element) {
      element.style.display = 'none';
    }
  }

  public remove() {
    const element = this.getContent();
    if (element) {
      element.remove();
    }
  }

  public componentDidUpdate(oldProps: CommonProps, newProps: CommonProps) {
    // В дальнейшем необходимо сравнивать пропсы для оптимизации ререндеров
    // If написан для купирования ошибки value is never read
    if (oldProps && newProps) {
      return true;
    }
    return true;
  }

  public compile(template: string, props: CommonProps) {
    const propsWithBlanks = Object.entries(this.children).reduce(
      (result, [key, value]) => {
        if (Array.isArray(value)) {
          result[key] = value.map((item) => `<div data-id="${item._id}"></div>`).join(' ');
        } else {
          result[key] = `<div data-id="${value._id}"></div>`;
        }
        return result;
      },
      {...props} as CommonProps,
    );
    // Рассмотреть вариант компиляции в один проход
    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
    fragment.innerHTML = new Templator(template).compile(propsWithBlanks);

    const {content} = fragment;

    Object.values(this.children).forEach((value) => {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          const selectedBlank = content.querySelector(`[data-id="${item._id}"]`);
          selectedBlank?.replaceWith(item.getContent() as Node);
        });
      } else {
        const selectedBlank = content.querySelector(`[data-id="${value._id}"]`);
        selectedBlank?.replaceWith(value.getContent() as Node);
      }
    });

    return content;
  }

  private _getChildren(allProps: CommonProps) {
    return Object.entries(allProps).reduce(
      (result, [key, value]) => {
        if (value instanceof Block) {
          result.children[key] = value;
        } else if (Array.isArray(value) && value.every((item) => item instanceof Block)) {
          result.children[key] = value as Block[];
        } else {
          result.props[key] = value;
        }
        return result;
      },
      {children: {} as Children, props: {} as CommonProps},
    );
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  private _createResources() {
    const {tagName} = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  private _componentDidMount() {
    this.componentDidMount();

    if (this.children) {
      Object.values(this.children).forEach((child) => {
        if (Array.isArray(child)) {
          child.forEach((item) => item.dispatchComponentDidMount());
        } else {
          child.dispatchComponentDidMount();
        }
      });
    }
  }

  private _componentDidUpdate(oldProps: CommonProps, newProps: CommonProps) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  private _render() {
    // В дальнейшем переписать метод на безопасный
    const block = this.render();

    const newElement = block.firstElementChild as HTMLElement;

    if (this._element && newElement) {
      this._element.innerHTML = '';
      this._element.replaceWith(newElement);

      this._addEvents();
    }

    this._element = newElement;
    this._addEvents();
  }

  private _makePropsProxy(props: CommonProps) {
    const eventBus = this.eventBus.bind(this);

    return new Proxy(props, {
      set(target, prop: string, value) {
        const _target = cloneObject(props);
        if (prop in target) {
          target[prop] = value;
          eventBus().emit(Block.EVENTS.FLOW_CDU, _target, props);
          return true;
        }
        return false;
      },
    });
  }

  private _createDocumentElement(tagName: string) {
    const element = document.createElement(tagName);
    element.setAttribute('data-id', this._id ?? '');
    return element;
  }

  private _addEvents() {
    const {events} = this.props;

    if (events) {
      Object.keys(events).forEach((eventName) => {
        this._element?.addEventListener(
          eventName,
          events[eventName].callback,
          events[eventName].capture ?? false,
        );
      });
    }
  }

  private _removeEvents() {
    const {events} = this.props;

    if (events) {
      Object.keys(events).forEach((eventName) => {
        this._element?.removeEventListener(eventName, events[eventName].callback);
      });
    }
  }
}
