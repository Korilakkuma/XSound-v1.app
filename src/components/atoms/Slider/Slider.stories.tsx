/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useCallback } from 'react';
import type { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { Slider } from './Slider';
import '../../../main.css';

export default {
  component: Slider
} as ComponentMeta<typeof Slider>;

const Template: ComponentStoryObj<typeof Slider> = {
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
    value: 0,
    min  : -100,
    max  : 100,
    step : 1
  }
};
