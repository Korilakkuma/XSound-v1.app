/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react';
import { X } from 'xsound';

import { AudioFieldset } from './AudioFieldset';

import type { Meta, StoryObj } from '@storybook/react';

import '../../../main.css';

export default {
  component: AudioFieldset
} as Meta<typeof AudioFieldset>;

const Template: StoryObj<typeof AudioFieldset> = {
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
