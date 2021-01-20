import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Props, Spacer } from './Spacer';
import '../../../main.css';

export default {
  title    : 'atoms/Spacer',
  component: Spacer
} as Meta;

const Template: Story<Props> = (args: Props) => {
  return (
    <React.Fragment>
      <div style={{ height: '24px', backgroundColor: '#ccc' }} />
      <Spacer {...args} />
      <div style={{ display: 'flex' }}>
        <div style={{ width: '45%', height: '24px', backgroundColor: '#999' }} />
        <Spacer {...args} />
        <div style={{ width: '45%', height: '24px', backgroundColor: '#999' }} />
      </div>
    </React.Fragment>
  );
};

export const Primary = Template.bind({});

Primary.args = {
  space: 2
};

export const Secondary = Template.bind({});

Secondary.args = {
  space    : 2,
  direction: 'top'
};

export const Tertiary = Template.bind({});

Tertiary.args = {
  space    : 2,
  direction: 'left'
};
