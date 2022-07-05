/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { OscillatorSelector } from './OscillatorSelector';
import '../../../main.css';

export default {
  component: OscillatorSelector
} as ComponentMeta<typeof OscillatorSelector>;

const Template: ComponentStoryObj<typeof OscillatorSelector> = {
  render: (args) => <OscillatorSelector {...args} />
};

export const Primary = {
  ...Template,
  args: {
    radioName  : 'oscillator-selector',
    type       : 'sawtooth',
    onChange   : (event: React.ChangeEvent<HTMLFormElement>) => {
      alert(`${event.type} ${event.currentTarget.value}`);
    }
  }
};
