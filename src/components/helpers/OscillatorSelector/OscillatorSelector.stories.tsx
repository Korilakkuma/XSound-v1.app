import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Props, OscillatorSelector } from './OscillatorSelector';
import '../../../main.css';

export default {
  title    : 'helpers/OscillatorSelector',
  component: OscillatorSelector
} as Meta;

const Template: Story<Props> = (args: Props) => <OscillatorSelector {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  radioName  : 'oscillator-selector',
  type       : 'sawtooth',
  onChange   : (event: React.ChangeEvent<HTMLFormElement>) => {
    alert(`${event.type} ${event.currentTarget.value}`);
  }
};
