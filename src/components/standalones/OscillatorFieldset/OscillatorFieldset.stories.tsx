import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Props, OscillatorFieldset } from './OscillatorFieldset';
import '../../../main.css';

export default {
  title    : 'standalones/OscillatorFieldset',
  component: OscillatorFieldset
} as Meta;

const Template: Story<Props> = (args: Props) => <OscillatorFieldset {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  oscillatorNumber: 0,
  label           : 'Oscillator-1',
  radioName       : 'oscillator-type-0',
  defaultState    : true
};

export const Secondary = Template.bind({});

Secondary.args = {
  oscillatorNumber: 1,
  label           : 'Oscillator-2',
  radioName       : 'oscillator-type-1'
};
