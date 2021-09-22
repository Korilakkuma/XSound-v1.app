import React, { useState, useEffect } from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Props, RecorderFieldset } from './RecorderFieldset';
import '../../../main.css';

import { XSoundSource } from '../../../types';
import { X } from 'xsound';

export default {
  title    : 'standalones/RecorderFieldset',
  component: RecorderFieldset
} as Meta;

const Template: Story<Props> = () => {
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (loaded) {
      return;
    }

    const constraints = { audio : true, video : false };

    try {
      X('stream').setup(constraints).ready();
      X('stream').param('output', false);
      X('stream').ready()
        .then(() => {
          X('stream').start();
        });
    } catch (error) {
      if (error instanceof Error) {
        window.alert(error.message);
      }
    }

    setLoaded(true);
  }, [loaded]);

  return <RecorderFieldset loadedApp sources={['stream'] as XSoundSource[]} />;
};

export const Primary = Template.bind({});
