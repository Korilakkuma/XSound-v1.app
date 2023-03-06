/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useMemo } from 'react';
import type { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { DelayFieldset } from './DelayFieldset';
import '../../../main.css';

import { X } from 'xsound';

export default {
  component: DelayFieldset
} as ComponentMeta<typeof DelayFieldset>;

const Template: ComponentStoryObj<typeof DelayFieldset> = {
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
          }}
          style={{ backgroundColor: '#fff' }}
        >
          {label}
        </button>
        <DelayFieldset />
      </React.Fragment>
    );
  }
};

export const Primary = {
  ...Template
};
