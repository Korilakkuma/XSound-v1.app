/* eslint-disable react-hooks/rules-of-hooks */
import React, { useCallback, useState } from 'react';

import { Slider } from './Slider';

import type { Meta, StoryObj } from '@storybook/react';
import '../../../main.css';

export default {
  component: Slider
} as Meta<typeof Slider>;

const Template: StoryObj<typeof Slider> = {
  render: (args) => {
    const [value, setValue] = useState<number>(0);

    const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.currentTarget.valueAsNumber);
    }, []);

    const props = { ...args, value, onChange };

    return (
      <React.Fragment>
        <span>{value}</span>
        <Slider {...props} />
      </React.Fragment>
    );
  }
};

export const Primary = {
  ...Template,
  args: {
    label: 'slider',
    value: 0,
    min  : -100,
    max  : 100,
    step : 1
  }
};
