/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useMemo, useState } from 'react';
import { X } from 'xsound';

import { ReverbFieldset } from './ReverbFieldset';

import type { RIRDescriptor } from '../../../types';
import type { Meta, StoryObj } from '@storybook/react';

import '../../../main.css';

export default {
  component: ReverbFieldset
} as Meta<typeof ReverbFieldset>;

const rirDescriptors: RIRDescriptor[] = [
  { url: '/assets/impulse-responses/s1_r1_c.mp3', value: 1, label: '1 - 1', group: 'Sideways pointed cardioid measurements in the audience area' },
  { url: '/assets/impulse-responses/s1_r2_c.mp3', value: 2, label: '1 - 2', group: 'Sideways pointed cardioid measurements in the audience area' },
  { url: '/assets/impulse-responses/s1_r1_o.mp3', value: 3, label: '1 - 1', group: 'Omnidirectional measurements in the audience area' },
  { url: '/assets/impulse-responses/s1_r2_o.mp3', value: 4, label: '1 - 2', group: 'Omnidirectional measurements in the audience area' }
];

const Template: StoryObj<typeof ReverbFieldset> = {
  render: () => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const [paused, setPaused] = useState<boolean>(true);

    const label = useMemo(() => {
      if (loaded) {
        return paused ? 'Start' : 'Stop';
      }

      return 'Loading audio ...';
    }, [loaded, paused]);

    const rirs: AudioBuffer[] = useMemo(() => [], []);

    useEffect(() => {
      if (loaded) {
        return;
      }

      X('audio').setup({
        decodeCallback: () => {
          setLoaded(true);
        }
      });

      rirDescriptors.forEach((rirDescriptor: RIRDescriptor) => {
        X.ajax({
          url            : rirDescriptor.url,
          type           : 'arraybuffer',
          timeout        : 60000,
          successCallback: (_: ProgressEvent, arraybuffer: ArrayBuffer) => {
            X.decode(X.get(), arraybuffer, (audiobuffer: AudioBuffer) => {
              rirs.push(audiobuffer);

              if (rirs.length === rirDescriptors.length) {
                X('audio').module('reverb').preset({ rirs });
              }
            });
          }
        });
      });

      X.ajax({
        url            : '/assets/audio/mp3/forever-love-piano-instruments.mp3',
        timeout        : 60000,
        successCallback: (_: ProgressEvent, arraybuffer: ArrayBuffer) => {
          X('audio').ready(arraybuffer);
        }
      });
    }, [loaded, rirs]);

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
        <ReverbFieldset rirDescriptors={rirDescriptors} />
      </React.Fragment>
    );
  }
};

export const Primary = {
  ...Template
};
