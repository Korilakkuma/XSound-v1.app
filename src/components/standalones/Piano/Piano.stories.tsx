/* eslint-disable react-hooks/rules-of-hooks */
import React, { useCallback, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { X } from 'xsound';

import { store } from '../../../store';

import { Piano } from './Piano';

import type { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import type { OneshotSetting, OneshotSettings } from 'xsound';

import '../../../main.css';

export default {
  component: Piano
} as ComponentMeta<typeof Piano>;

const oneshots = [
  'assets/one-shots/piano-2/C.wav',
  'assets/one-shots/piano-2/D.wav',
  'assets/one-shots/piano-2/E.wav',
  'assets/one-shots/piano-2/F.wav',
  'assets/one-shots/piano-2/G.wav',
  'assets/one-shots/piano-2/A.wav',
  'assets/one-shots/piano-2/B.wav'
];

const Template: ComponentStoryObj<typeof Piano> = {
  render: (args) => {
    const [loaded, setLoaded] = useState<boolean>(false);

    const getBufferIndexCallback = useCallback((pianoIndex: number) => {
      switch (Math.trunc((pianoIndex + 9) % 12)) {
        case  0 :
        case  1 :
          return 0;
        case  2 :
        case  3 :
          return 1;
        case  4 :
          return 2;
        case  5 :
        case  6 :
          return 3;
        case  7 :
        case  8 :
          return 4;
        case  9 :
        case 10 :
          return 5;
        case 11 :
          return 6;
        default :
          return -1;
      }
    }, []);

    const calculatePianoRateCallback = useCallback((pianoIndex: number) => {
      const sharps  = [1, 4, 6, 9, 11, 13, 16, 18, 21, 23, 25, 28, 30, 33, 35, 37, 40, 42, 45, 47, 49, 52, 54, 57, 59, 61, 64, 66, 69, 71, 73, 76, 78, 81, 83, 85];
      const isSharp = sharps.includes(pianoIndex);

      let rate = 0;

      if ((pianoIndex >= 0) && (pianoIndex <= 2)) {
        rate = 0.0625;
      } else if ((pianoIndex >= 3) && (pianoIndex <= 14)) {
        rate = 0.125;
      } else if ((pianoIndex >= 15) && (pianoIndex <= 26)) {
        rate = 0.25;
      } else if ((pianoIndex >= 27) && (pianoIndex <= 38)) {
        rate = 0.5;
      } else if ((pianoIndex >= 39) && (pianoIndex <= 50)) {
        rate = 1;
      } else if ((pianoIndex >= 51) && (pianoIndex <= 62)) {
        rate = 2;
      } else if ((pianoIndex >= 63) && (pianoIndex <= 74)) {
        rate = 4;
      } else if ((pianoIndex >= 75) && (pianoIndex <= 86)) {
        rate = 8;
      } else if ((pianoIndex >= 87) && (pianoIndex <= 98)) {
        rate = 16;
      }

      if (isSharp) {
        rate *= Math.pow(2, (1 / 12));
      }

      return rate;
    }, []);

    const createOneshotSettingsCallback = useCallback(() => {
      const settings: OneshotSettings = [];

      for (let i = 0; i < 88; i++) {
        const setting: OneshotSetting = {
          bufferIndex : 0,
          playbackRate: 1,
          loop        : false,
          loopStart   : 0,
          loopEnd     : 0,
          volume      : 1
        };

        setting.bufferIndex  = getBufferIndexCallback(i);
        setting.playbackRate = calculatePianoRateCallback(i);

        settings[i] = setting;
      }

      return settings;
    }, [getBufferIndexCallback, calculatePianoRateCallback]);

    useEffect(() => {
      if (loaded) {
        return;
      }

      const setup = async () => {
        const clonedX = await X.clone();

        if (clonedX instanceof Error) {
          return;
        }

        X('oscillator').setup([true, true, true, true]);
        clonedX('oscillator').setup([true, true, true, true]);

        for (let i = 0, len = X('oscillator').length(); i < len; i++) {
          X('oscillator').get(i).param({ type: 'sawtooth' });
          clonedX('oscillator').get(i).param({ type: 'sawtooth' });
        }

        X('oneshot').setup({
          resources      : oneshots,
          settings       : createOneshotSettingsCallback(),
          timeout        : 60000,
          successCallback: () => {
            setLoaded(true);
          },
          errorCallback  : () => {
            alert('The loading of audio files failed.');
          }
        });
      };

      setup();
    }, [loaded, createOneshotSettingsCallback]);

    return (
      <Provider store={store}>
        <Piano currentSoundSource={args.currentSoundSource} />
      </Provider>
    );
  }
};

export const Primary = {
  ...Template,
  args: {
    currentSoundSource: 'oscillator'
  }
};
