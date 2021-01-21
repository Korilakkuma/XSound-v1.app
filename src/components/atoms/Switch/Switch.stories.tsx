import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Props, Switch } from './Switch';
import '../../../main.css';

export default {
  title    : 'atoms/Switch',
  component: Switch
} as Meta;

const Template: Story<Props> = (args: Props) => <Switch {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  id            : 'primary-switch',
  label         : 'Default false',
  defaultChecked: false,
  onChange      : (event: React.SyntheticEvent) => {
    alert(`${event.type} ${(event.currentTarget as HTMLInputElement).checked}`);
  }
};

export const Secondary = Template.bind({});

Secondary.args = {
  id            : 'secondary-switch',
  label         : 'Default true',
  defaultChecked: true,
  onChange      : (event: React.SyntheticEvent) => {
    alert(`${event.type} ${(event.currentTarget as HTMLInputElement).checked}`);
  }
};
