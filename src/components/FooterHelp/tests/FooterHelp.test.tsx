import React from 'react';
import {InfoMinor} from '@shopify/polaris-icons';
import {mountWithApp} from 'tests/utilities';

import {Icon} from '../../Icon';
import {FooterHelp} from '../FooterHelp';

describe('<FooterHelp />', () => {
  const children = 'Learn more about fulfilling orders';

  it('renders its children', () => {
    const footerHelp = mountWithApp(<FooterHelp>{children}</FooterHelp>);
    expect(footerHelp).toHaveReactProps({
      children,
    });
  });

  it('renders the help icon', () => {
    const footerHelp = mountWithApp(<FooterHelp>{children}</FooterHelp>);
    expect(footerHelp).toContainReactComponent(Icon, {
      source: InfoMinor,
    });
  });
});
