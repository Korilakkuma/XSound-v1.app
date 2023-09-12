import React from 'react';

import { Spacer } from '/src/components/atoms/Spacer';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: Spacer
} as Meta<typeof Spacer>;

const Template: StoryObj<typeof Spacer> = {
  render: (args) => {
    return (
      <React.Fragment>
        <div style={{ height: '24px', backgroundColor: '#ccc' }} />
        <Spacer {...args} direction='bottom' />
        <div style={{ display: 'flex' }}>
          <div style={{ width: '45%', height: '24px', backgroundColor: '#999' }} />
          <Spacer {...args} />
          <div style={{ width: '45%', height: '24px', backgroundColor: '#999' }} />
        </div>
      </React.Fragment>
    );
  }
};

export const Primary = {
  ...Template,
  args: {
    space: 2
  }
};

export const Secondary = {
  ...Template,
  args: {
    space: 2,
    direction: 'top'
  }
};

export const Tertiary = {
  ...Template,
  args: {
    space: 2,
    direction: 'left'
  }
};
