import React, {useContext} from 'react';
import {mount, mountWithApp} from 'tests/utilities';

import {useTheme} from '../hooks';
import {ThemeContext} from '../context';

let consoleErrorSpy: jest.SpyInstance;

function Component() {
  return useTheme() === useContext(ThemeContext) ? <div /> : null;
}

describe('useTheme', () => {
  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('returns context', () => {
    const component = mountWithApp(<Component />);
    expect(component).toContainReactComponent('div');
  });

  it('throws an error if context is not set', () => {
    const attemptMount = () => mount(<Component />);
    expect(attemptMount).toThrow(
      'No Theme was provided. Your application must be wrapped in an <AppProvider> component. See https://polaris.shopify.com/components/structure/app-provider for implementation instructions.',
    );
  });
});
