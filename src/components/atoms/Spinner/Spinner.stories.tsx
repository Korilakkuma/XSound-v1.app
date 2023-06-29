/* eslint-disable react-hooks/rules-of-hooks */
import React, { useCallback, useState } from 'react';

import { Spinner } from '/src/components/atoms/Spinner';

import type { Meta, StoryObj } from '@storybook/react';
import '/src/main.css';

export default {
  component: Spinner
} as Meta<typeof Spinner>;

const Template: StoryObj<typeof Spinner> = {
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
