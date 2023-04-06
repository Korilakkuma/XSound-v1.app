/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useMemo, useState } from 'react';
import { X } from 'xsound';

import { PhaserFieldset } from './PhaserFieldset';

import type { Meta, StoryObj } from '@storybook/react';

import '../../../main.css';

export default {
  component: PhaserFieldset
} as Meta<typeof PhaserFieldset>;

const Template: StoryObj<typeof PhaserFieldset> = {
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
        <PhaserFieldset />
      </React.Fragment>
    );
  }
};

export const Primary = {
  ...Template
};
