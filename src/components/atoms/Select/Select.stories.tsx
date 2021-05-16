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
  id      : 'primary-select',
  label   : 'Primary Select',
  values  : ['A', 'B', 'C'],
  texts   : ['0 - 0', '0 - 1', '0 - 2'],
  disabled: false,
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => {
    alert(event.currentTarget.value);
  }
};

export const Secondary = Template.bind({});

Secondary.args = {
  id      : 'secondary-select',
  label   : 'Secondary Select',
  values  : ['A', 'B', 'C'],
  texts   : ['0 - 0', '0 - 1', '0 - 2'],
  disabled: false,
  width   : '50%',
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => {
    alert(event.currentTarget.value);
  }
};

export const Tertiary = Template.bind({});

Tertiary.args = {
  id          : 'tertiary-select',
  label       : 'Tertiary Select',
  values      : ['A', 'B', 'C'],
  texts       : ['0 - 0', '0 - 1', '0 - 2'],
  disabled    : false,
  defaultValue: 'C',
  onChange    : (event: React.ChangeEvent<HTMLSelectElement>) => {
    alert(event.currentTarget.value);
  }
};
