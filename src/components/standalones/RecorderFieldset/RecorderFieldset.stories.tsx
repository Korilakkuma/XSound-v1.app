/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { X } from 'xsound';

import { RecorderFieldset } from './RecorderFieldset';

import type { Meta, StoryObj } from '@storybook/react';

import '../../../main.css';

export default {
  component: RecorderFieldset
} as Meta<typeof RecorderFieldset>;

const Template: StoryObj<typeof RecorderFieldset> = {
  render: () => {
    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
      if (loaded) {
        return;
      }

      const constraints: MediaStreamConstraints = { audio : true, video : false };

      X('stream').setup(constraints);
      X('stream').param({ output: false });
      X('stream').ready()
        .then(() => {
          X('stream').start();
        })
        .catch((error: Error) => {
          alert(error.message);
        });

      setLoaded(true);
    }, [loaded]);

    return <RecorderFieldset loadedApp />;
  }
};

export const Primary = {
  ...Template
};
