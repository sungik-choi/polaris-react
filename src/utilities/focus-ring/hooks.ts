import {useRef, RefObject, useEffect, useCallback} from 'react';
import debounce from 'lodash/debounce';
import {useToggle} from '../use-toggle';
import {
  setStyles,
  handleWatcherIsFocusedChange,
  handleWatchActiveElement,
  Options,
} from './utilities';

export function useFocusRing(
  boundingNode: RefObject<HTMLElement>,
  {borderWidth = 0, size = 'base', focused, watchNode}: Options,
) {
  const {
    value: watcherIsFocused,
    setTrue: setWatcherIsFocusedTrue,
    setFalse: setWatcherIsFocusedFalse,
  } = useToggle(false);
  const focusNode = useRef(document.createElement('div'));
  const isTab = useRef(false);

  const watchActiveElement = useCallback(() => {
    handleWatchActiveElement({
      watchNode,
      watcherIsFocused,
      isTab: isTab.current,
      onActive: setWatcherIsFocusedTrue,
      onReset: setWatcherIsFocusedFalse,
    });
  }, [
    setWatcherIsFocusedFalse,
    setWatcherIsFocusedTrue,
    watchNode,
    watcherIsFocused,
  ]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key !== 'Tab') return;
    isTab.current = true;
  }, []);

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    if (event.key !== 'Tab') return;
    isTab.current = false;
  }, []);

  const handleFocusOut = useCallback(
    (event: FocusEvent) => {
      if (event.relatedTarget !== null) return;
      setWatcherIsFocusedFalse();
    },
    [setWatcherIsFocusedFalse],
  );

  const setFocusStyles = useCallback(() => {
    setStyles({
      boundingNode,
      size,
      borderWidth,
      focused,
      focusNode: focusNode.current,
      watcherIsFocused,
    });
  }, [borderWidth, focused, boundingNode, size, watcherIsFocused]);

  const handleResize = useCallback(
    debounce(
      () => {
        if (!watcherIsFocused) return;
        setFocusStyles();
      },
      40,
      {leading: true, trailing: true, maxWait: 40},
    ),
    [],
  );

  useEffect(() => {
    if (!watchNode) return;
    document.addEventListener('focus', watchActiveElement, true);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    document.body.addEventListener('focusout', handleFocusOut);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('focus', watchActiveElement, true);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      document.body.removeEventListener('focusout', handleFocusOut);
      window.removeEventListener('resize', handleResize);
    };
  }, [
    handleFocusOut,
    handleKeyDown,
    handleKeyUp,
    handleResize,
    watchActiveElement,
    watchNode,
    watcherIsFocused,
  ]);

  useEffect(() => {
    document.body.appendChild(focusNode.current);
  }, []);

  useEffect(() => {
    handleWatcherIsFocusedChange({
      watchNode,
      watcherIsFocused,
      callback: setWatcherIsFocusedTrue,
    });
  }, [setWatcherIsFocusedTrue, watchNode, watcherIsFocused]);

  useEffect(() => {
    setTimeout(setFocusStyles, 0);
  }, [setFocusStyles]);
}
