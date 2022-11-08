/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { ParameterController } from './ParameterController';
import '../../../main.css';

export default {
  component: ParameterController
} as ComponentMeta<typeof ParameterController>;

const Template: ComponentStoryObj<typeof ParameterController> = {
  render: (args) => <ParameterController {...args} />
};

export const Primary = {
  ...Template,
  args: {
    label       : 'Parameter Controller default',
    autoupdate  : false,
    min         : -100,
    max         : 100,
    step        : 1,
    defaultValue: 0,
    onChange    : (event: React.ChangeEvent<HTMLInputElement>) => {
      // eslint-disable-next-line no-console
      console.log(`${event.type} ${event.currentTarget.valueAsNumber}`);
    }
  }
};

export const Secondary = {
  ...Template,
  args: {
    label       : 'Parameter Controller with `width`',
    autoupdate  : false,
    min         : -100,
    max         : 100,
    step        : 1,
    defaultValue: 0,
    width       : '50%',
    onChange    : (event: React.ChangeEvent<HTMLInputElement>) => {
      // eslint-disable-next-line no-console
      console.log(`${event.type} ${event.currentTarget.valueAsNumber}`);
    }
  }
};
