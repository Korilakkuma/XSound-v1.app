/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useMemo } from 'react';
import type { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { PreampFieldset } from './PreampFieldset';
import '../../../main.css';

import { X } from 'xsound';

export default {
  component: PreampFieldset
} as ComponentMeta<typeof PreampFieldset>;

const Template: ComponentStoryObj<typeof PreampFieldset> = {
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

      X('audio').module('preamp').param({
        samples: 2048,
        pre    : {
          state: true,
          gain : 0.5,
          lead : 0.5
        },
        post   : {
          state: true
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
          }}
          style={{ backgroundColor: '#fff' }}
        >
          {label}
        </button>
        <PreampFieldset />
      </React.Fragment>
    );
  }
};

export const Primary = {
  ...Template
};
