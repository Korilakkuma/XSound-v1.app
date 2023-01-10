/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import type { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { Button } from './Button';
import '../../../main.css';

export default {
  component: Button
} as ComponentMeta<typeof Button>;

const Template: ComponentStoryObj<typeof Button> = {
  render: (args) => <Button {...args} />
};

export const Primary = {
  ...Template,
  args: {
    active : false,
    label  : 'Start',
    width  : 70,
    height : 33,
    image  : 'https://xsound.app/assets/images/button-audio.png',
    size   : '70px 99px',
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
      alert(`${event.type} start`);
    }
  }
};

export const Secondary = {
  ...Template,
  args: {
    active : true,
    label  : 'Stop',
    width  : 70,
    height : 33,
    image  : 'https://xsound.app/assets/images/button-audio.png',
    size   : '70px 99px',
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
      alert(`${event.type} stop`);
    }
  }
};
