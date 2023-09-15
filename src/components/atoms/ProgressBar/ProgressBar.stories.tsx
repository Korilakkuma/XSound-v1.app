import React, { useMemo, useState } from 'react';

import { ProgressBar } from '/src/components/atoms/ProgressBar';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: ProgressBar
} as Meta<typeof ProgressBar>;

const ProgressBarContainer: React.FC<{ label?: string | undefined }> = (args) => {
  const [rate, setRate] = useState<number>(0);

  const label = useMemo(() => `Loaded ${rate <= 100 ? rate : 100} %`, [rate]);

  const props = { rate, label: args.label ? args.label : label };

  return (
    <React.Fragment>
      <button type='button' onClick={() => setRate(rate + 1)} style={{ backgroundColor: '#fff' }}>
        +1
      </button>
      <button type='button' onClick={() => setRate(rate + 10)} style={{ marginLeft: '4px', backgroundColor: '#fff' }}>
        +10
      </button>
      <button type='button' onClick={() => setRate(0)} style={{ marginLeft: '4px', backgroundColor: '#fff' }}>
        0
      </button>
      <ProgressBar {...props} />
    </React.Fragment>
  );
};

const Template: StoryObj<typeof ProgressBar> = {
  render: (args) => <ProgressBarContainer {...args} />
};

export const Primary = {
  ...Template
};

export const Secondary = {
  ...Template,
  render: () => {
    return <ProgressBar label='Now Loading ...' />;
  }
};
