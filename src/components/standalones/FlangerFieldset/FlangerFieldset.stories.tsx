import React, { useState, useEffect } from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Props, FlangerFieldset } from './FlangerFieldset';
import '../../../main.css';

import { X } from 'xsound';

export default {
  title    : 'standalones/FlangerFieldset',
  component: FlangerFieldset
} as Meta;

const Template: Story<Props> = () => {
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
};

export const Primary = Template.bind({});
