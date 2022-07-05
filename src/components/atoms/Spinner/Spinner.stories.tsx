/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useCallback } from 'react';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { Spinner } from './Spinner';
import '../../../main.css';

export default {
  component: Spinner
} as ComponentMeta<typeof Spinner>;

const Template: ComponentStoryObj<typeof Spinner> = {
  render: (args) => {
    const [value, setValue] = useState<number>(0);

    const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.currentTarget.valueAsNumber);
    }, []);

    const props = { ...args, value, onChange };

    return (
      <React.Fragment>
        <label htmlFor={props.id} style={{ marginRight: '12px' }}>Spinner</label>
        <Spinner {...props} />
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
