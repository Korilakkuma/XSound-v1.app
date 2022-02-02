import React, { useEffect } from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Props, AudioFieldset } from './AudioFieldset';
import '../../../main.css';

import { X } from 'xsound';

export default {
  title    : 'standalones/AudioFieldset',
  component: AudioFieldset
} as Meta;

const Template: Story<Props> = () => {
  useEffect(() => {
    if (X('audio').module('pitchshifter').state()) {
      return;
    }

    X('audio').module('pitchshifter').activate();
  });

  return <AudioFieldset loadedApp />;
};

export const Primary = Template.bind({});
