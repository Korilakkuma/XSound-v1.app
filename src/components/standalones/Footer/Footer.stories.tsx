/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';

import { Footer } from './Footer';

import type { Meta, StoryObj } from '@storybook/react';

import '../../../main.css';

export default {
  component: Footer
} as Meta<typeof Footer>;

const Template: StoryObj<typeof Footer> = {
  render: () => <Footer />
};

export const Primary = {
  ...Template
};
