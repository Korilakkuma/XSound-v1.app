import React, { useState, useEffect, useMemo } from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Props, EqualizerFieldset } from './EqualizerFieldset';
import '../../../main.css';

import { XSoundSource } from '../../../types/types';
import { X } from 'xsound';

export default {
  title    : 'standalones/EqualizerFieldset',
  component: EqualizerFieldset
} as Meta;

const Template: Story<Props> = () => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(true);

  const sources = useMemo(() => ['audio'] as XSoundSource[], []);

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
      url    : 'https://weblike-curtaincall.ssl-lolipop.jp/assets/wav/forever-love-piano-instruments.wav',
      timeout: 60000,
      success: (event: Event, arrayBuffer: ArrayBuffer) => {
        X('audio').ready(arrayBuffer);
      }
    });
  }, [loaded]);

  return (
    <React.Fragment>
      <button
        type="button"
        disabled={!loaded}
        onClick={() => {
          X('audio').toggle(X('audio').param('currentTime'));
          setPaused(!paused);
        }}
        style={{ backgroundColor: '#fff' }}
      >
        {loaded ? (paused ? 'Start' : 'Stop') : 'Loading audio ...'}
      </button>
      <EqualizerFieldset sources={sources} />
    </React.Fragment>
  );
};

export const Primary = Template.bind({});
