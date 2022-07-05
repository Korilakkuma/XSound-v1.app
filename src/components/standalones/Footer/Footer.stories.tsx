/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { Footer } from './Footer';
import '../../../main.css';

export default {
  component: Footer
} as ComponentMeta<typeof Footer>;

const Template: ComponentStoryObj<typeof Footer> = {
  render: () => <Footer />
};

export const Primary = {
  ...Template
};
