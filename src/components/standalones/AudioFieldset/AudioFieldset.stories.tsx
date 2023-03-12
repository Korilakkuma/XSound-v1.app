/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react';
import { X } from 'xsound';

import { AudioFieldset } from './AudioFieldset';

import type { ComponentMeta, ComponentStoryObj } from '@storybook/react';

import '../../../main.css';

export default {
  component: AudioFieldset
} as ComponentMeta<typeof AudioFieldset>;

const Template: ComponentStoryObj<typeof AudioFieldset> = {
  render: () => {
    useEffect(() => {
      if (X('audio').module('pitchshifter').state()) {
        return;
      }

      X('audio').module('pitchshifter').activate();
    });

    return <AudioFieldset loadedApp />;
  }
};

export const Primary = {
  ...Template
};
