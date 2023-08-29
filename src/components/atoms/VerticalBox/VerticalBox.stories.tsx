import { VerticalBox } from '/src/components/atoms/VerticalBox';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: VerticalBox
} as Meta<typeof VerticalBox>;

const Template: StoryObj<typeof VerticalBox> = {
  render: (args) => {
    return (
      <VerticalBox {...args}>
        <div style={{ height: '150px', backgroundColor: '#333' }} />
        <div style={{ height: '300px', backgroundColor: '#666' }} />
        <div style={{ height: '600px', backgroundColor: '#999' }} />
      </VerticalBox>
    );
  }
};

export const Primary = {
  ...Template,
  args: {
    numberOfDivisions: 5
  }
};
