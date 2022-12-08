/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useMemo } from 'react';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { RingModulatorFieldset } from './RingModulatorFieldset';
import '../../../main.css';

import { X } from 'xsound';

export default {
  component: RingModulatorFieldset
} as ComponentMeta<typeof RingModulatorFieldset>;

const Template: ComponentStoryObj<typeof RingModulatorFieldset> = {
  render: () => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const [paused, setPaused] = useState<boolean>(true);

    const label = useMemo(() => {
      if (loaded) {
        return paused ? 'Start' : 'Stop';
      }

      return 'Loading audio ...';
    }, [loaded, paused]);

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
            if (paused) {
              X('audio').start(X('audio').param('currentTime'));
              setPaused(false);
            } else {
              X('audio').stop();
              setPaused(true);
            }

            setPaused(!paused);
          }}
          style={{ backgroundColor: '#fff' }}
        >
          {label}
        </button>
        <RingModulatorFieldset />
      </React.Fragment>
    );
  }
};

export const Primary = {
  ...Template
};
