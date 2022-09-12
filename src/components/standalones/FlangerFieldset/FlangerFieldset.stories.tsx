/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { FlangerFieldset } from './FlangerFieldset';
import '../../../main.css';

import { X, ajax } from 'xsound';

export default {
  component: FlangerFieldset
} as ComponentMeta<typeof FlangerFieldset>;

const Template: ComponentStoryObj<typeof FlangerFieldset> = {
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

      ajax({
        url            : 'https://weblike-curtaincall.ssl-lolipop.jp/assets/wav/forever-love-piano-instruments.wav',
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
        <FlangerFieldset />
      </React.Fragment>
    );
  }
};

export const Primary = {
  ...Template
};
