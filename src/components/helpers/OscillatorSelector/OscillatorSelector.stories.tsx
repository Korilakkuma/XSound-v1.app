/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useCallback } from 'react';
import type { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { OscillatorSelector } from './OscillatorSelector';
import '../../../main.css';

export default {
  component: OscillatorSelector
} as ComponentMeta<typeof OscillatorSelector>;

const Template: ComponentStoryObj<typeof OscillatorSelector> = {
  render: (args) => {
    const [type, setType] = useState<OscillatorType>('sawtooth');

    const onChange = useCallback((event: React.ChangeEvent<HTMLFormElement>) => {
      const radios = event.currentTarget['radio-oscillator-selector'];

      if (!radios) {
        return;
      }

      // `document.forms['oscillator-selector'].elements['radio-oscillator-selector']`
      for (const radio of radios) {
        if (radio.checked) {
          const value = radio.value;

          if ((value === 'sine') || (value === 'square') || (value === 'sawtooth') || (value === 'triangle')) {
            setType(value);
          }
        }
      }
    }, []);

    return <OscillatorSelector {...args} type={type} onChange={onChange} />;
  }
};

export const Primary = {
  ...Template,
  args: {
    radioName: 'oscillator-selector',
    type     : 'sawtooth'
  }
};
