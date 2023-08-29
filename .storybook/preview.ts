import type { Preview } from '@storybook/react';
import '/src/main.css';

export const parameters: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' }
  }
};
