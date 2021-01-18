import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Props, Select } from './Select';
import '../../../main.css';

export default {
  title    : 'atoms/Select',
  component: Select
} as Meta;

const Template: Story<Props> = (args: Props) => <Select {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  values  : ['A', 'B', 'C'],
  texts   : ['0 - 0', '0 - 1', '0 - 2'],
  onChange: (event: React.SyntheticEvent) => {
    alert((event.currentTarget as HTMLInputElement).value);
  }
};

export const Secondary = Template.bind({});

Secondary.args = {
  values  : ['A', 'B', 'C'],
  texts   : ['0 - 0', '0 - 1', '0 - 2'],
  width   : '50%',
  onChange: (event: React.SyntheticEvent) => {
    alert((event.currentTarget as HTMLInputElement).value);
  }
};

export const Tertiary = Template.bind({});

Tertiary.args = {
  values      : ['A', 'B', 'C'],
  texts       : ['0 - 0', '0 - 1', '0 - 2'],
  defaultValue: 'C',
  onChange    : (event: React.SyntheticEvent) => {
    alert((event.currentTarget as HTMLInputElement).value);
  }
};
