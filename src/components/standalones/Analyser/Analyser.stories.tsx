/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { createStoreMock } from '../../../../mock/createStoreMock';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { Analyser } from './Analyser';
import '../../../main.css';

import { X } from 'xsound';

export default {
  component: Analyser
} as ComponentMeta<typeof Analyser>;

const Template: ComponentStoryObj<typeof Analyser> = {
  render: () => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const [active, setActive] = useState<boolean>(false);

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
      <Provider store={createStoreMock({ analyserState: active })}>
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
            }}
            style={{ backgroundColor: '#fff' }}
          >
            {loaded ? (X('audio').paused() ? 'Start' : 'Stop') : 'Loading audio ...'}
          </button>
          <button
            type="button"
            onClick={() => setActive(!active)}
            style={{
              marginLeft: '8px',
              backgroundColor: '#fff'
            }}
          >
            {active ? 'Close' : 'Open'}
          </button>
          <Analyser loadedApp />
        </React.Fragment>
      </Provider>
    );
  }
};

export const Primary = {
  ...Template
};
