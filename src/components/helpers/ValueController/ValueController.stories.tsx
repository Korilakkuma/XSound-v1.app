import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Props, ValueController } from './ValueController';
import '../../../main.css';

export default {
  title    : 'helpers/ValueController',
  component: ValueController
} as Meta;

const Template: Story<Props> = (args: Props) => <ValueController {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  label       : 'Value Controller default',
  id          : 'value-controller-default',
  min         : -100,
  max         : 100,
  step        : 1,
  defaultValue: 0,
  onChange    : (event: React.SyntheticEvent) => {
    // eslint-disable-next-line no-console
    console.log(`${event.type} ${(event.currentTarget as HTMLInputElement).valueAsNumber}`);
  }
};

export const Secondary = Template.bind({});

Secondary.args = {
  label       : 'Value Controller with `width`',
  id          : 'value-controller-with-width',
  min         : -100,
  max         : 100,
  step        : 1,
  defaultValue: 0,
  width       : '50%',
  onChange    : (event: React.SyntheticEvent) => {
    // eslint-disable-next-line no-console
    console.log(`${event.type} ${(event.currentTarget as HTMLInputElement).valueAsNumber}`);
  }
};
