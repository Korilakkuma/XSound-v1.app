import { SVG } from '/src/components/atoms/SVG';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: SVG
} as Meta<typeof SVG>;

const Template: StoryObj<typeof SVG> = {
  render: (args) => {
    return <SVG {...args} />;
  }
};

export const Primary = {
  ...Template,
  args: {
    width: 640,
    height: 360,
    hasHoverStyle: false,
    setElementCallback: (element: SVGSVGElement) => {
      const XMLNS = 'http://www.w3.org/2000/svg' as const;

      const rect = document.createElementNS(XMLNS, 'rect');

      rect.setAttribute('fill', '#c0c');
      rect.setAttribute('width', '640');
      rect.setAttribute('height', '360');

      element.appendChild(rect);
    }
  }
};

export const Secondary = {
  ...Template,
  args: {
    width: 640,
    height: 360,
    hasHoverStyle: true,
    setElementCallback: (element: SVGSVGElement) => {
      const XMLNS = 'http://www.w3.org/2000/svg' as const;

      const rect = document.createElementNS(XMLNS, 'rect');

      rect.setAttribute('fill', '#c0c');
      rect.setAttribute('width', '640');
      rect.setAttribute('height', '360');

      element.appendChild(rect);
    }
  }
};
