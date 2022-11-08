/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { GroupSelect } from './GroupSelect';
import '../../../main.css';

export default {
  component: GroupSelect
} as ComponentMeta<typeof GroupSelect>;

const Template: ComponentStoryObj<typeof GroupSelect> = {
  render: (args) => <GroupSelect {...args} />
};

export const Primary = {
  ...Template,
  args: {
    label   : 'Primary Group Select',
    values  : {
      group0: ['A', 'B', 'C'],
      group1: ['D', 'E', 'F'],
      group2: ['G', 'H', 'I']
    },
    texts   : {
      group0: ['0 - 0', '0 - 1', '0 - 2'],
      group1: ['1 - 0', '1 - 1', '1 - 2'],
      group2: ['2 - 0', '2 - 1', '2 - 2']
    },
    groups  : ['group0', 'group1', 'group2'],
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => {
      alert(event.currentTarget.value);
    }
  }
};

export const Secondary = {
  ...Template,
  args: {
    label   : 'Secondary Group Select',
    values  : {
      group0: ['A', 'B', 'C'],
      group1: ['D', 'E', 'F'],
      group2: ['G', 'H', 'I']
    },
    texts   : {
      group0: ['0 - 0', '0 - 1', '0 - 2'],
      group1: ['1 - 0', '1 - 1', '1 - 2'],
      group2: ['2 - 0', '2 - 1', '2 - 2']
    },
    groups  : ['group0', 'group1', 'group2'],
    width   : '50%',
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => {
      alert(event.currentTarget.value);
    }
  }
};

export const Tertiary = {
  ...Template,
  args: {
    label       : 'Tertiary Group Select',
    values      : {
      group0: ['A', 'B', 'C'],
      group1: ['D', 'E', 'F'],
      group2: ['G', 'H', 'I']
    },
    texts       : {
      group0: ['0 - 0', '0 - 1', '0 - 2'],
      group1: ['1 - 0', '1 - 1', '1 - 2'],
      group2: ['2 - 0', '2 - 1', '2 - 2']
    },
    groups      : ['group0', 'group1', 'group2'],
    defaultValue: 'I',
    onChange    : (event: React.ChangeEvent<HTMLSelectElement>) => {
      alert(event.currentTarget.value);
    }
  }
};
