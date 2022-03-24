import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Props, ParameterController } from './ParameterController';
import '../../../main.css';

export default {
  title    : 'helpers/ParameterController',
  component: ParameterController
} as Meta;

const Template: Story<Props> = (args: Props) => <ParameterController {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  label       : 'Parameter Controller default',
  id          : 'parameter-controller-default',
  min         : -100,
  max         : 100,
  step        : 1,
  defaultValue: 0,
  onChange    : (event: React.ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line no-console
    console.log(`${event.type} ${event.currentTarget.valueAsNumber}`);
  }
};

export const Secondary = Template.bind({});

Secondary.args = {
  label       : 'Parameter Controller with `width`',
  id          : 'parameter-controller-with-width',
  min         : -100,
  max         : 100,
  step        : 1,
  defaultValue: 0,
  width       : '50%',
  onChange    : (event: React.ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line no-console
    console.log(`${event.type} ${event.currentTarget.valueAsNumber}`);
  }
};
