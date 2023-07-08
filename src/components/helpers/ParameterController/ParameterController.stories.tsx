/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';

import { ParameterController } from '/src/components/helpers/ParameterController';

import type { Meta, StoryObj } from '@storybook/react';
import '/src/main.css';

export default {
  component: ParameterController
} as Meta<typeof ParameterController>;

const Template: StoryObj<typeof ParameterController> = {
  render: (args) => <ParameterController {...args} />
};

export const Primary = {
  ...Template,
  args: {
    label: 'Parameter Controller default',
    autoupdate: false,
    min: -100,
    max: 100,
    step: 1,
    defaultValue: 0,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      // eslint-disable-next-line no-console
      console.log(`${event.type} ${event.currentTarget.valueAsNumber}`);
    }
  }
};

export const Secondary = {
  ...Template,
  args: {
    label: 'Parameter Controller with `width`',
    autoupdate: false,
    min: -100,
    max: 100,
    step: 1,
    defaultValue: 0,
    width: '50%',
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      // eslint-disable-next-line no-console
      console.log(`${event.type} ${event.currentTarget.valueAsNumber}`);
    }
  }
};
