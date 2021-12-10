import React, {RefObject, Fragment} from 'react';
import debounce from 'lodash/debounce';

import {EventListener} from '../EventListener';
import {
  setStyles,
  handleWatcherIsFocusedChange,
  getWatchNode,
  handleWatchActiveElement,
  Options,
} from '../../utilities/focus-ring';

export interface FocusRingProps extends Options {
  boundingNode: RefObject<HTMLElement>;
}

interface State {
  watcherIsFocused: boolean;
}

export class FocusRing extends React.PureComponent<FocusRingProps, State> {
  state: State = {
    watcherIsFocused: false,
  };

  private handleResize = debounce(
    () => {
      if (!this.state.watcherIsFocused) return;
      this.setFocusStyles();
    },
    40,
    {leading: true, trailing: true, maxWait: 40},
  );

  private focusNode: HTMLDivElement | null = null;
  private isTab = false;
  private mounted = false;

  componentDidMount() {
    const {focused} = this.props;
    const {watcherIsFocused} = this.state;
    const watchNode = this.watchNode();

    this.mounted = true;

    this.focusNode = document.createElement('div');
    document.body.appendChild(this.focusNode);

    const invokedCallback = handleWatcherIsFocusedChange({
      watchNode,
      watcherIsFocused,
      callback: () => {
        console.log('...');
        this.setState({watcherIsFocused: true}, this.setFocusStyles);
      },
    });
    if (invokedCallback === undefined) return;

    if (focused) this.setFocusStyles();
  }

  componentDidUpdate({watchNode: prevWatchNode}: FocusRingProps) {
    const {watcherIsFocused} = this.state;
    const watchNode = this.watchNode();

    if (
      (watchNode && watchNode.current) ===
      (prevWatchNode && prevWatchNode.current)
    ) {
      return;
    }

    handleWatcherIsFocusedChange({
      watchNode,
      watcherIsFocused,
      callback: () => {
        this.setState({watcherIsFocused: true}, this.setFocusStyles);
      },
    });
  }

  render() {
    this.mounted && this.setFocusStyles();

    return this.watchNode() ? (
      <>
        <EventListener
          target="document"
          event="focus"
          handler={this.watchActiveElement}
          capture
        />
        <EventListener
          target="document"
          event="keydown"
          handler={this.handleKeyDown}
          capture
        />
        <EventListener
          target="document"
          event="keyup"
          handler={this.handleKeyUp}
          capture
        />
        <EventListener
          target="body"
          event="focusout"
          handler={this.handleFocusOut}
          capture
        />
        <EventListener event="resize" handler={this.handleResize} capture />
      </>
    ) : null;
  }

  private watchActiveElement = () => {
    const {watcherIsFocused} = this.state;
    const watchNode = this.watchNode();

    handleWatchActiveElement({
      watchNode,
      watcherIsFocused,
      isTab: this.isTab,
      onActive: () => this.setState({watcherIsFocused: true}),
      onReset: () => this.setState({watcherIsFocused: false}),
    });
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'Tab') return;
    this.isTab = true;
  };

  private handleKeyUp = (event: KeyboardEvent) => {
    if (event.key !== 'Tab') return;
    this.isTab = false;
  };

  private handleFocusOut = (event: FocusEvent) => {
    if (event.relatedTarget !== null) return;
    this.setState({watcherIsFocused: false});
  };

  private setFocusStyles = () => {
    const {borderWidth = 0, size = 'base', focused, boundingNode} = this.props;
    const {watcherIsFocused} = this.state;
    setStyles({
      boundingNode,
      size,
      borderWidth,
      focused,
      focusNode: this.focusNode,
      watcherIsFocused,
    });
  };

  private watchNode() {
    const {watchNode, boundingNode, focused} = this.props;
    return getWatchNode({watchNode, boundingNode, focused});
  }
}
