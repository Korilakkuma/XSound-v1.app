import React from 'react';

import { GroupSelect } from '/src/components/atoms/GroupSelect';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: GroupSelect
} as Meta<typeof GroupSelect>;

const Template: StoryObj<typeof GroupSelect> = {
  render: (args) => <GroupSelect {...args} />
};

export const Primary = {
  ...Template,
  args: {
    label: 'Primary Group Select',
    values: {
      group0: ['A', 'B', 'C'],
      group1: ['D', 'E', 'F'],
      group2: ['G', 'H', 'I']
    },
    texts: {
      group0: ['0 - 0', '0 - 1', '0 - 2'],
      group1: ['1 - 0', '1 - 1', '1 - 2'],
      group2: ['2 - 0', '2 - 1', '2 - 2']
    },
    groups: ['group0', 'group1', 'group2'],
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => {
      alert(event.currentTarget.value);
    }
  }
};

export const Secondary = {
  ...Template,
  args: {
    label: 'Secondary Group Select',
    values: {
      group0: ['A', 'B', 'C'],
      group1: ['D', 'E', 'F'],
      group2: ['G', 'H', 'I']
    },
    texts: {
      group0: ['0 - 0', '0 - 1', '0 - 2'],
      group1: ['1 - 0', '1 - 1', '1 - 2'],
      group2: ['2 - 0', '2 - 1', '2 - 2']
    },
    groups: ['group0', 'group1', 'group2'],
    width: '50%',
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => {
      alert(event.currentTarget.value);
    }
  }
};

export const Tertiary = {
  ...Template,
  args: {
    label: 'Tertiary Group Select',
    values: {
      group0: ['A', 'B', 'C'],
      group1: ['D', 'E', 'F'],
      group2: ['G', 'H', 'I']
    },
    texts: {
      group0: ['0 - 0', '0 - 1', '0 - 2'],
      group1: ['1 - 0', '1 - 1', '1 - 2'],
      group2: ['2 - 0', '2 - 1', '2 - 2']
    },
    groups: ['group0', 'group1', 'group2'],
    defaultValue: 'I',
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => {
      alert(event.currentTarget.value);
    }
  }
};
