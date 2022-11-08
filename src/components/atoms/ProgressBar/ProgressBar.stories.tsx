/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useMemo } from 'react';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { ProgressBar } from './ProgressBar';
import '../../../main.css';

export default {
  component: ProgressBar
} as ComponentMeta<typeof ProgressBar>;

const Template: ComponentStoryObj<typeof ProgressBar> = {
  render: (args) => {
    const [rate, setRate] = useState<number>(0);

    const label = useMemo(() => `Loaded ${rate <= 100 ? rate : 100} %`, [rate]);

    const props = { ...args, rate, label };

    return (
      <React.Fragment>
        <button
          type="button"
          onClick={() => setRate(rate + 1)}
          style={{ backgroundColor: '#fff' }}
        >
          +1
        </button>
        <button
          type="button"
          onClick={() => setRate(rate + 10)}
          style={{ marginLeft: '4px', backgroundColor: '#fff' }}
        >
          +10
        </button>
        <button
          type="button"
          onClick={() => setRate(0)}
          style={{ marginLeft: '4px', backgroundColor: '#fff' }}
        >
          0
        </button>
        <ProgressBar {...props} />
      </React.Fragment>
    );
  }
};

export const Primary = {
  ...Template,
};
