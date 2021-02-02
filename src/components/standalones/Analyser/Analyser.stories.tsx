import React, { useState, useEffect, useMemo } from 'react';
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

  const sources = useMemo(() => ['audio'], []);

  useEffect(() => {
    if (loaded) {
      return;
    }

    X('audio').setup({
      ready: () => {
        setLoaded(true);
      }
    });

    X.ajax({
      url     : 'https://weblike-curtaincall.ssl-lolipop.jp/assets/wav/forever-love-piano-instruments.wav',
      timeout : 60000,
      success : (event: Event, arrayBuffer: ArrayBuffer) => {
        X('audio').ready(arrayBuffer);
      }
    });
  }, [loaded]);

  return (
    <React.Fragment>
      <button
        type="button"
        disabled={!loaded}
        onClick={() => X('audio').toggle(X('audio').param('currentTime'))}
        style={{ backgroundColor: '#fff' }}
      >
        {loaded ? (X('audio').isPaused() ? 'Start' : 'Stop') : 'Loading audio ...'}
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
      <Analyser active={active} sources={sources} />
    </React.Fragment>
  );
};

export const Primary = Template.bind({});