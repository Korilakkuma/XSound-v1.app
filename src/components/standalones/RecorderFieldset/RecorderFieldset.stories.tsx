/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import type { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { RecorderFieldset } from './RecorderFieldset';
import '../../../main.css';

import { X } from 'xsound';

export default {
  component: RecorderFieldset
} as ComponentMeta<typeof RecorderFieldset>;

const Template: ComponentStoryObj<typeof RecorderFieldset> = {
  render: () => {
    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
      if (loaded) {
        return;
      }

      const constraints: MediaStreamConstraints = { audio : true, video : false };

      try {
        X('stream').setup(constraints);
        X('stream').param({ output: false });
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

    return <RecorderFieldset loadedApp />;
  }
};

export const Primary = {
  ...Template
};
