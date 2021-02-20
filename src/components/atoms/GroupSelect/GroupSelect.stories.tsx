import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Props, GroupSelect } from './GroupSelect';
import '../../../main.css';

export default {
  title    : 'atoms/GroupSelect',
  component: GroupSelect
} as Meta;

const Template: Story<Props> = (args: Props) => <GroupSelect {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  id      : 'primary-group-select',
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
  onChange: (event: React.SyntheticEvent) => {
    alert((event.currentTarget as HTMLInputElement).value);
  }
};

export const Secondary = Template.bind({});

Secondary.args = {
  id      : 'secondary-group-select',
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
  onChange: (event: React.SyntheticEvent) => {
    alert((event.currentTarget as HTMLInputElement).value);
  }
};

export const Tertiary = Template.bind({});

Tertiary.args = {
  id      : 'tertiary-group-select',
  label   : 'Tertiary Group Select',
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
  onChange    : (event: React.SyntheticEvent) => {
    alert((event.currentTarget as HTMLInputElement).value);
  }
};
