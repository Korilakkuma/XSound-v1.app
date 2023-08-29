import { Button } from '/src/components/atoms/Button';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: Button
} as Meta<typeof Button>;

const Template: StoryObj<typeof Button> = {
  render: (args) => <Button {...args} />
};

export const Primary = {
  ...Template,
  args: {
    active: false,
    label: 'Start',
    width: 70,
    height: 33,
    image: 'https://xsound.app/assets/images/button-audio.png',
    size: '70px 99px',
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
      alert(`${event.type} start`);
    }
  }
};

export const Secondary = {
  ...Template,
  args: {
    active: true,
    label: 'Stop',
    width: 70,
    height: 33,
    image: 'https://xsound.app/assets/images/button-audio.png',
    size: '70px 99px',
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
      alert(`${event.type} stop`);
    }
  }
};
