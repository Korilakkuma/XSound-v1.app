import React, { useState } from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Props, ProgressBar } from './ProgressBar';
import '../../../main.css';

export default {
  title    : 'atoms/ProgressBar',
  component: ProgressBar
} as Meta;

const Template: Story<Props> = (args: Props) => {
  const [rate, setRate] = useState<number>(0);

  const label = `Loaded ${rate <= 100 ? rate : 100} %`;

  const props = args.id ? Object.assign({}, args, { rate, label }) : args;

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
};

export const Primary = Template.bind({});

Primary.args = {
  id: 'primary-progress-bar'
};

export const Secondary = Template.bind({});
