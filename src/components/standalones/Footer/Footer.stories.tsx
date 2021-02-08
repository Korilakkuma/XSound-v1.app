import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Props, Footer } from './Footer';
import '../../../main.css';

export default {
  title    : 'standalones/Footer',
  component: Footer
} as Meta;

const Template: Story<Props> = () => <Footer />;

export const Primary = Template.bind({});
