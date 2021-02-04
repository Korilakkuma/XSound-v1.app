import React, { useState, useEffect, useMemo } from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Props, ReverbFieldset } from './ReverbFieldset';
import '../../../main.css';

import { RIRInfo } from '../../../types/types';
import { X } from 'xsound';

export default {
  title    : 'standalones/ReverbFieldset',
  component: ReverbFieldset
} as Meta;

const rirInfos: RIRInfo[] = [
  { url: '/assets/impulse-responses/s1_r1_c.mp3', value: 1, label: '1 - 1', group: 'Sideways pointed cardioid measurements in the audience area' },
  { url: '/assets/impulse-responses/s1_r2_c.mp3', value: 2, label: '1 - 2', group: 'Sideways pointed cardioid measurements in the audience area' },
  { url: '/assets/impulse-responses/s1_r1_o.mp3', value: 3, label: '1 - 1', group: 'Omnidirectional measurements in the audience area' },
  { url: '/assets/impulse-responses/s1_r2_o.mp3', value: 4, label: '1 - 2', group: 'Omnidirectional measurements in the audience area' }
];

const Template: Story<Props> = () => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(true);

  const sources = useMemo(() => ['audio'], []);

  const reverbs: AudioBuffer[] = useMemo(() => [], []);

  useEffect(() => {
    if (loaded) {
      return;
    }

    X('audio').setup({
      ready: () => {
        setLoaded(true);
      }
    });

    rirInfos.forEach((rirInfo: RIRInfo) => {
      X.ajax(rirInfo.url, 'arraybuffer', 60000, (event: ProgressEvent, arrayBuffer: ArrayBuffer) => {
        X.decode(X.get(), arrayBuffer, (audioBuffer: AudioBuffer) => {
          reverbs.push(audioBuffer);

          if (reverbs.length === rirInfos.length) {
            X('audio').module('reverb').preset(reverbs);
          }
        });
      });
    });

    X.ajax({
      url    : 'https://weblike-curtaincall.ssl-lolipop.jp/assets/wav/forever-love-piano-instruments.wav',
      timeout: 60000,
      success: (event: Event, arrayBuffer: ArrayBuffer) => {
        X('audio').ready(arrayBuffer);
      }
    });
  }, [loaded, reverbs]);

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
      <ReverbFieldset sources={sources} rirInfos={rirInfos} />
    </React.Fragment>
  );
};

export const Primary = Template.bind({});
