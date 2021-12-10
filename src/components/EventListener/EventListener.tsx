import {PureComponent, RefObject} from 'react';

type Target =
  | 'window'
  | 'document'
  | 'body'
  | HTMLElement
  | RefObject<HTMLElement>;

interface BaseEventProps {
  event: string;
  capture?: boolean;
  target?: Target;
  handler(event: Event): void;
}

export interface EventListenerProps extends BaseEventProps {
  passive?: boolean;
}

// see https://github.com/oliviertassinari/react-event-listener/
export class EventListener extends PureComponent<EventListenerProps, never> {
  componentDidMount() {
    this.attachListener();
  }

  componentDidUpdate({passive, ...detachProps}: EventListenerProps) {
    this.detachListener(detachProps);
    this.attachListener();
  }

  componentWillUnmount() {
    this.detachListener();
  }

  render() {
    return null;
  }

  private attachListener() {
    const {event, handler, capture, passive} = this.props;
    const target = this.target();
    if (!target) return;
    target.addEventListener(event, handler, {capture, passive});
  }

  private detachListener(prevProps?: BaseEventProps) {
    const {event, handler, capture} = prevProps || this.props;
    const target = this.target();
    if (!target) return;
    target.removeEventListener(event, handler, capture);
  }

  private target() {
    const {target = 'window'} = this.props;
    if (target === 'window') {
      return window;
    } else if (target === 'document') {
      return document;
    } else if (target === 'body') {
      return document.body;
    } else if ('current' in target) {
      return target.current;
    } else {
      return target;
    }
  }
}
