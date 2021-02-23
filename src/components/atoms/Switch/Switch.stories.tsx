import React, { useState } from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Props, Switch } from './Switch';
import '../../../main.css';

export default {
  title    : 'atoms/Switch',
  component: Switch
} as Meta;

const Template: Story<Props> = (args: Props) => {
  const [checked, setChecked] = useState<boolean>(args.checked);

  return <Switch {...args} checked={checked} onChange={() => setChecked(!checked)} />;
};

export const Primary = Template.bind({});

Primary.args = {
  id     : 'primary-switch',
  label  : 'checked false',
  checked: false
};

export const Secondary = Template.bind({});

Secondary.args = {
  id     : 'secondary-switch',
  label  : 'checked true',
  checked: true
};
