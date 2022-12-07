/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { DistortionFieldset } from './DistortionFieldset';
import '../../../main.css';

import { X } from 'xsound';

export default {
  component: DistortionFieldset
} as ComponentMeta<typeof DistortionFieldset>;

const Template: ComponentStoryObj<typeof DistortionFieldset> = {
  render: () => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const [paused, setPaused] = useState<boolean>(true);

    useEffect(() => {
      if (loaded) {
        return;
      }

      X('audio').setup({
        decodeCallback: () => {
          setLoaded(true);
        }
      });

      X.ajax({
        url            : '/assets/audio/mp3/forever-love-piano-instruments.mp3',
        timeout        : 60000,
        successCallback: (event: ProgressEvent, arraybuffer: ArrayBuffer) => {
          X('audio').ready(arraybuffer);
        }
      });
    }, [loaded]);

    return (
      <React.Fragment>
        <button
          type="button"
          disabled={!loaded}
          onClick={() => {
            if (X('audio').paused()) {
              X('audio').start(X('audio').param('currentTime'));
            } else {
              X('audio').stop();
            }

            setPaused(!paused);
          }}
          style={{ backgroundColor: '#fff' }}
        >
          {loaded ? (paused ? 'Start' : 'Stop') : 'Loading audio ...'}
        </button>
        <DistortionFieldset />
      </React.Fragment>
    );
  }
};

export const Primary = {
  ...Template
};
