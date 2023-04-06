/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { Provider } from 'react-redux';

import { store } from '../../../store';

import { OscillatorFieldset } from './OscillatorFieldset';

import type { Meta, StoryObj } from '@storybook/react';

import '../../../main.css';

export default {
  component: OscillatorFieldset
} as Meta<typeof OscillatorFieldset>;

const Template: StoryObj<typeof OscillatorFieldset> = {
  render: (args) => {
    return (
      <Provider store={store}>
        <OscillatorFieldset {...args} />
      </Provider>
    );
  }
};

export const Primary = {
  ...Template,
  args: {
    oscillatorNumber: 0,
    label           : 'Oscillator-1',
    radioName       : 'oscillator-type-0'
  }
};

export const Secondary = {
  ...Template,
  args: {
    oscillatorNumber: 1,
    label           : 'Oscillator-2',
    radioName       : 'oscillator-type-1'
  }
};
