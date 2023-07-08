/* eslint-disable react-hooks/rules-of-hooks */
import React, { useCallback, useState } from 'react';

import { OscillatorSelector } from '/src/components/helpers/OscillatorSelector';

import type { Meta, StoryObj } from '@storybook/react';
import '/src/main.css';

export default {
  component: OscillatorSelector
} as Meta<typeof OscillatorSelector>;

const Template: StoryObj<typeof OscillatorSelector> = {
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

          if (value === 'sine' || value === 'square' || value === 'sawtooth' || value === 'triangle') {
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
    type: 'sawtooth'
  }
};
