import React, { useState, useCallback } from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Props, Slider } from './Slider';
import '../../../main.css';

export default {
  title    : 'atoms/Slider',
  component: Slider
} as Meta;

const Template: Story<Props> = (args: Props) => {
  const [value, setValue] = useState<number>(0);

  const onChange = useCallback((event: React.SyntheticEvent) => {
    setValue((event.currentTarget as HTMLInputElement).valueAsNumber);
  }, []);

  const props = Object.assign({}, args, { value, onChange });

  return (
    <React.Fragment>
      <span>{value}</span>
      <Slider {...props} />
    </React.Fragment>
  );
};

export const Primary = Template.bind({});

Primary.args = {
  value: 0,
  min  : -100,
  max  : 100,
  step : 1
};
