import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Props, Button } from './Button';
import '../../../main.css';

export default {
  title    : 'atoms/Button',
  component: Button
} as Meta;

const Template: Story<Props> = (args: Props) => <Button {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  active : false,
  label  : 'Start',
  width  : 70,
  height : 33,
  image  : 'https://xsound.app/assets/images/button-audio.png',
  size   : '70px 99px',
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
    alert(`${event.type} start`);
  }
};

export const Secondary = Template.bind({});

Secondary.args = {
  active : true,
  label  : 'Stop',
  width  : 70,
  height : 33,
  image  : 'https://xsound.app/assets/images/button-audio.png',
  size   : '70px 99px',
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
    alert(`${event.type} stop`);
  }
};
