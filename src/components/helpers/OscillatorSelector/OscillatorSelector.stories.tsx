import React, { useCallback, useState } from 'react';

import { OscillatorSelector } from '/src/components/helpers/OscillatorSelector';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: OscillatorSelector
} as Meta<typeof OscillatorSelector>;

const OscillatorSelectorContainer: React.FC<{
  radioName: string;
  type: OscillatorType;
}> = (args) => {
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

  const onChangeRadioCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const type = event.currentTarget.value;

    switch (type) {
      case 'sine':
      case 'square':
      case 'sawtooth':
      case 'triangle':
        setType(type);
        break;
      default:
        break;
    }
  }, []);

  return <OscillatorSelector {...args} type={type} onChange={onChange} onChangeRadio={onChangeRadioCallback} />;
};

const Template: StoryObj<typeof OscillatorSelector> = {
  render: (args) => <OscillatorSelectorContainer {...args} />
};

export const Primary = {
  ...Template,
  args: {
    radioName: 'oscillator-selector',
    type: 'sawtooth'
  }
};
