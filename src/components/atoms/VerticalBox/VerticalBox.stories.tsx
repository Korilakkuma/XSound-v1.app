/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { VerticalBox } from './VerticalBox';
import '../../../main.css';

export default {
  component: VerticalBox
} as ComponentMeta<typeof VerticalBox>;

const Template: ComponentStoryObj<typeof VerticalBox> = {
  render: (args) => {
    return (
      <VerticalBox {...args}>
        <div style={{ height: '150px', backgroundColor: '#333' }} />
        <div style={{ height: '300px', backgroundColor: '#666' }} />
        <div style={{ height: '600px', backgroundColor: '#999' }} />
      </VerticalBox>
    );
  }
};

export const Primary = {
  ...Template
};
