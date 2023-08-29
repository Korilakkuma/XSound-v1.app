import React, { useCallback, useState } from 'react';

import { Slider } from '/src/components/atoms/Slider';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: Slider
} as Meta<typeof Slider>;

const SliderContainer: React.FC<{
  label: string;
  min: number;
  max: number;
  step: number;
}> = (args) => {
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
};

const Template: StoryObj<typeof Slider> = {
  render: (args) => <SliderContainer {...args} />
};

export const Primary = {
  ...Template,
  args: {
    label: 'slider',
    min: -100,
    max: 100,
    step: 1
  }
};
