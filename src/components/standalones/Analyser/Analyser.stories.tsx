import React, { useState, useEffect } from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Props, Analyser } from './Analyser';
import '../../../main.css';

import { X } from 'xsound';

export default {
  title    : 'standalones/Analyser',
  component: Analyser
} as Meta;

const Template: Story<Props> = () => {
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
  );
};

export const Primary = Template.bind({});
