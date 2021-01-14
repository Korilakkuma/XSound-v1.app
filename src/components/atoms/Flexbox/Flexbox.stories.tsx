import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Props, Flexbox } from './Flexbox';
import '../../../main.css';

export default {
  title    : 'atoms/Flexbox',
  component: Flexbox
} as Meta;

const Template: Story<Props> = (args: Props) => {
  return (
    <Flexbox {...args}>
      <div style={{ width: '150px', height: '150px', backgroundColor: '#333' }} />
      <div style={{ width: '300px', height: '300px', backgroundColor: '#666' }} />
      <div style={{ width: '600px', height: '600px', backgroundColor: '#999' }} />
    </Flexbox>
  );
};

export const Primary = Template.bind({});
