import { Canvas } from '/src/components/atoms/Canvas';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: Canvas
} as Meta<typeof Canvas>;

const Template: StoryObj<typeof Canvas> = {
  render: (args) => {
    return <Canvas {...args} />;
  }
};

export const Primary = {
  ...Template,
  args: {
    width: 640,
    height: 360,
    hasHoverStyle: false,
    setElementCallback: (element: HTMLCanvasElement) => {
      const context = element.getContext('2d');

      if (context === null) {
        return;
      }

      context.fillStyle = '#c0c';
      context.fillRect(0, 0, 640, 360);
    }
  }
};

export const Secondary = {
  ...Template,
  args: {
    width: 640,
    height: 360,
    hasHoverStyle: true,
    setElementCallback: (element: HTMLCanvasElement) => {
      const context = element.getContext('2d');

      if (context === null) {
        return;
      }

      context.fillStyle = '#c0c';
      context.fillRect(0, 0, 640, 360);
    }
  }
};
