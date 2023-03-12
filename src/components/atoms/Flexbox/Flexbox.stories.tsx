/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';

import { Flexbox } from './Flexbox';

import type { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import '../../../main.css';

export default {
  component: Flexbox
} as ComponentMeta<typeof Flexbox>;

const Template: ComponentStoryObj<typeof Flexbox> = {
  render: (args) => {
    return (
      <Flexbox {...args}>
        <div style={{ width: '150px', height: '150px', backgroundColor: '#333' }} />
        <div style={{ width: '300px', height: '300px', backgroundColor: '#666' }} />
        <div style={{ width: '600px', height: '600px', backgroundColor: '#999' }} />
      </Flexbox>
    );
  }
};

export const Primary = {
  ...Template
};
