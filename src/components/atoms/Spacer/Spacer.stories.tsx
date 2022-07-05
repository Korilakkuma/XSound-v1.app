/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { Spacer } from './Spacer';
import '../../../main.css';

export default {
  component: Spacer
} as ComponentMeta<typeof Spacer>;

const Template: ComponentStoryObj<typeof Spacer> = {
  render: (args) => {
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
    space    : 2,
    direction: 'top'
  }
};

export const Tertiary = {
  ...Template,
  args: {
    space    : 2,
    direction: 'left'
  }
};
