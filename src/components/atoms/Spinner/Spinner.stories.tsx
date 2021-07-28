import React, { useState, useCallback } from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Props, Spinner } from './Spinner';
import '../../../main.css';

export default {
  title    : 'atoms/Spinner',
  component: Spinner
} as Meta;

const Template: Story<Props> = (args: Props) => {
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
};

export const Primary = Template.bind({});

Primary.args = {
  value: 0,
  min  : -100,
  max  : 100,
  step : 1
};
