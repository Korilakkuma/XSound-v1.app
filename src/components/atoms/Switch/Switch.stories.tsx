/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';

import { Switch } from '/src/components/atoms/Switch';

import type { Meta, StoryObj } from '@storybook/react';
import '/src/main.css';

export default {
  component: Switch
} as Meta<typeof Switch>;

const Template: StoryObj<typeof Switch> = {
  render: (args) => {
    const [checked, setChecked] = useState<boolean>(args.checked);

    return <Switch {...args} checked={checked} onChange={() => setChecked(!checked)} />;
  }
};

export const Primary = {
  ...Template,
  args: {
    label: 'checked false',
    checked: false,
    labelAsText: false
  }
};

export const Secondary = {
  ...Template,
  args: {
    label: 'checked true',
    checked: true,
    labelAsText: false
  }
};

export const Tertiary = {
  ...Template,
  args: {
    label: 'checked false',
    checked: false,
    labelAsText: true
  }
};
