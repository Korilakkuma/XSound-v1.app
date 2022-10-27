/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { Provider } from 'react-redux';
import { createStoreMock } from '../../../../mock/createStoreMock';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { OscillatorFieldset } from './OscillatorFieldset';
import '../../../main.css';

export default {
  component: OscillatorFieldset
} as ComponentMeta<typeof OscillatorFieldset>;

const Template: ComponentStoryObj<typeof OscillatorFieldset> = {
  render: (args) => {
    return (
      <Provider store={createStoreMock({ oscillatorStates: [true, false] })}>
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
