import {RefObject} from 'react';

type AnyFunction = (...args: any) => any;

export interface Options {
  borderWidth?: number;
  size?: 'base' | 'wide';
  focused?: boolean;
  watchNode?: RefObject<HTMLElement>;
}
interface DeriveStyle {
  top: number;
  left: number;
  width: number;
  right: number;
  bottom: number;
  height: number;
  offset: number;
  borderRadius: string;
  focused: boolean;
}

export function getWatchNode({
  watchNode,
  boundingNode,
  focused,
}: {
  watchNode?: RefObject<HTMLElement>;
  boundingNode: RefObject<HTMLElement>;
  focused?: boolean;
}) {
  if (watchNode) return watchNode;

  return focused === undefined ? boundingNode : undefined;
}

export function watchActiveElement() {}

export function handleWatchActiveElement<F extends AnyFunction>({
  watchNode,
  watcherIsFocused,
  isTab,
  onActive,
  onReset,
}: {
  watchNode?: RefObject<HTMLElement>;
  watcherIsFocused: boolean;
  isTab: boolean;
  onActive: F;
  onReset: F;
}): ReturnType<F> | void {
  if (
    watchNode &&
    document.activeElement === watchNode.current &&
    !watcherIsFocused &&
    isTab
  ) {
    return onActive();
  } else if (
    watchNode &&
    document.activeElement !== watchNode.current &&
    watcherIsFocused
  ) {
    return onReset();
  }
}

export function handleWatcherIsFocusedChange<F extends AnyFunction>({
  watchNode,
  watcherIsFocused,
  callback,
}: {
  watchNode?: RefObject<HTMLElement>;
  watcherIsFocused: boolean;
  callback: F;
}): ReturnType<F> | void {
  return watchNode &&
    document.activeElement === watchNode.current &&
    !watcherIsFocused
    ? callback()
    : false;
}

function styles({
  top,
  left,
  width,
  height,
  offset,
  borderRadius,
  focused,
  right,
  bottom,
}: DeriveStyle) {
  const stroke = 2;
  const sizeIncrease = offset * stroke;
  const boxShadow = focused
    ? `0 0 0 ${stroke}px #498af2`
    : `0 0 0 ${-1 * offset}px #498af2`;

  const clientWidth = document.documentElement.clientWidth;
  const clientHeight = document.documentElement.clientHeight;

  let calculatedWidth =
    right < clientWidth
      ? width + sizeIncrease
      : width - (right - clientWidth) - stroke;

  let calculatedHeight =
    bottom < clientHeight
      ? height + sizeIncrease
      : height - (bottom - clientHeight) - stroke;

  const useLeftOffset = left <= 0;
  const calculatedLeft = !useLeftOffset ? left - offset : stroke;
  if (useLeftOffset) calculatedWidth -= stroke;

  const useTopOffset = top <= 0;
  const calculatedTop = !useTopOffset ? top - offset : stroke;
  if (useTopOffset) calculatedHeight -= stroke;

  return `position: absolute;
    top: ${calculatedTop}px;
    left: ${calculatedLeft}px;
    width: ${calculatedWidth}px;
    height: ${calculatedHeight}px;
    pointer-events: none;
    box-shadow: ${boxShadow};
    border-radius: ${borderRadius};
    z-index: 600;
    transition: box-shadow 100ms cubic-bezier(0.4, 0.22, 0.28, 1);
    `;
}

export function setStyles({
  boundingNode,
  size,
  borderWidth = 0,
  focusNode,
  focused,
  watcherIsFocused,
}: Options & {
  boundingNode: RefObject<HTMLElement>;
  focusNode: HTMLElement | null;
  watcherIsFocused: boolean;
}) {
  if (!boundingNode.current) return;
  const {
    width,
    height,
    left,
    top,
    right,
    bottom,
  } = boundingNode.current.getBoundingClientRect();
  const offset = borderWidth + 1;
  const borderRadiusOffset = size === 'wide' ? 8 : 4;

  if (typeof window === 'undefined') return;
  const computedStyles = window.getComputedStyle(boundingNode.current);
  const borderRadius = computedStyles
    .getPropertyValue('border-radius')
    .split(' ')
    .map((radius) => `${parseInt(radius, 10) + borderRadiusOffset}px`)
    .join(' ');

  focusNode &&
    focusNode.setAttribute(
      'style',
      styles({
        top,
        left,
        right,
        bottom,
        width,
        height,
        offset,
        borderRadius,
        focused: focused || watcherIsFocused,
      }),
    );
}
