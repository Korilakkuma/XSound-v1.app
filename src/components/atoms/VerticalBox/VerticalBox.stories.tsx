import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Props, VerticalBox } from './VerticalBox';
import '../../../main.css';

export default {
  title    : 'atoms/VerticalBox',
  component: VerticalBox
} as Meta;

const Template: Story<Props> = (args: Props) => {
  return (
    <VerticalBox {...args}>
      <div style={{ height: '150px', backgroundColor: '#333' }} />
      <div style={{ height: '300px', backgroundColor: '#666' }} />
      <div style={{ height: '600px', backgroundColor: '#999' }} />
    </VerticalBox>
  );
};

export const Primary = Template.bind({});
