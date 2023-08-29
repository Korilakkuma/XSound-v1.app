import { Flexbox } from '/src/components/atoms/Flexbox';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: Flexbox
} as Meta<typeof Flexbox>;

const Template: StoryObj<typeof Flexbox> = {
  render: (args) => {
    return (
      <Flexbox {...args}>
        <div style={{ width: '150px', height: '150px', backgroundColor: '#333' }} />
        <div style={{ width: '300px', height: '300px', backgroundColor: '#666' }} />
        <div style={{ width: '600px', height: '600px', backgroundColor: '#999' }} />
      </Flexbox>
    );
  }
};

export const Primary = {
  ...Template
};
