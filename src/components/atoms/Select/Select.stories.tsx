/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { Select } from './Select';
import '../../../main.css';

export default {
  component: Select
} as ComponentMeta<typeof Select>;

const Template: ComponentStoryObj<typeof Select> = {
  render: (args) => <Select {...args} />
};

export const Primary = {
  ...Template,
  args: {
    id      : 'primary-select',
    label   : 'Primary Select',
    values  : ['A', 'B', 'C'],
    texts   : ['0 - 0', '0 - 1', '0 - 2'],
    disabled: false,
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => {
      alert(event.currentTarget.value);
    }
  }
};

export const Secondary = {
  ...Template,
  args: {
    id      : 'secondary-select',
    label   : 'Secondary Select',
    values  : ['A', 'B', 'C'],
    texts   : ['0 - 0', '0 - 1', '0 - 2'],
    disabled: false,
    width   : '50%',
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => {
      alert(event.currentTarget.value);
    }
  }
};

export const Tertiary = {
  ...Template,
  args: {
    id          : 'tertiary-select',
    label       : 'Tertiary Select',
    values      : ['A', 'B', 'C'],
    texts       : ['0 - 0', '0 - 1', '0 - 2'],
    disabled    : false,
    defaultValue: 'C',
    onChange    : (event: React.ChangeEvent<HTMLSelectElement>) => {
      alert(event.currentTarget.value);
    }
  }
};
