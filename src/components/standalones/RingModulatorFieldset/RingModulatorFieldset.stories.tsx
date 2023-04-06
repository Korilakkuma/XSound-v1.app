/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useMemo, useState } from 'react';
import { X } from 'xsound';

import { RingModulatorFieldset } from './RingModulatorFieldset';

import type { Meta, StoryObj } from '@storybook/react';

import '../../../main.css';

export default {
  component: RingModulatorFieldset
} as Meta<typeof RingModulatorFieldset>;

const Template: StoryObj<typeof RingModulatorFieldset> = {
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
        successCallback: (_: ProgressEvent, arraybuffer: ArrayBuffer) => {
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
