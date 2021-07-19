import React, { useState, useEffect, useCallback } from 'react';
import { Provider } from 'react-redux';
import { store } from '../../../store';

// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Props, BasicControllers } from './BasicControllers';
import '../../../main.css';

import { SoundSource, XSoundSource, OneshotSettings } from '../../../types';
import { X } from 'xsound';

export default {
  title    : 'standalones/BasicControllers',
  component: BasicControllers
} as Meta;

const oneshots = [
  'assets/one-shots/piano-2/C.wav',
  'assets/one-shots/piano-2/D.wav',
  'assets/one-shots/piano-2/E.wav',
  'assets/one-shots/piano-2/F.wav',
  'assets/one-shots/piano-2/G.wav',
  'assets/one-shots/piano-2/A.wav',
  'assets/one-shots/piano-2/B.wav'
];

const Template: Story<Props> = () => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [isOscillatorStop, setIsOscillatorStop] = useState<boolean>(true);
  const [isOneshotStop, setIsOneshotStop] = useState<boolean>(true);

  const getBufferIndexCallback = useCallback((pianoIndex: number) => {
    switch (Math.floor((pianoIndex + 9) % 12)) {
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
    const settings: OneshotSettings[] = [];

    for (let i = 0; i < 88; i++) {
      const setting: OneshotSettings = {
        buffer: 0,
        rate  : 1,
        loop  : false,
        start : 0,
        end   : 0,
        volume: 1
      };

      setting.buffer = getBufferIndexCallback(i);
      setting.rate   = calculatePianoRateCallback(i);

      settings[i] = setting;
    }

    return settings;
  }, [getBufferIndexCallback, calculatePianoRateCallback]);

  const onClickOscillatorCallback = useCallback(() => {
    if (isOscillatorStop) {
      X('oscillator').start(X.toFrequencies([40, (40 + 4), (40 + 7), (40 + 10)]));
    } else {
      X('oscillator').stop();
    }

    setIsOscillatorStop(!isOscillatorStop);
  }, [isOscillatorStop]);

  const onClickOneshotCallback = useCallback(() => {
    if (isOneshotStop) {
      X('oneshot').start(40);
      X('oneshot').start(44);
      X('oneshot').start(47);
      X('oneshot').start(50);
    } else {
      X('oneshot').stop(40);
      X('oneshot').stop(44);
      X('oneshot').stop(47);
      X('oneshot').stop(50);
    }

    setIsOneshotStop(!isOneshotStop);
  }, [isOneshotStop]);

  useEffect(() => {
    if (loaded) {
      return;
    }

    window.C = X.clone();

    X('oscillator').setup([true, true, true, true]);
    window.C('oscillator').setup([true, true, true, true]);

    for (let i = 0, len = X('oscillator').length(); i < len; i++) {
      X('oscillator', i).param('type', 'sawtooth');
      window.C('oscillator', i).param('type', 'sawtooth');
    }

    try {
      X('oneshot').setup({
        resources: oneshots,
        settings : createOneshotSettingsCallback(),
        timeout  : 60000,
        success  : () => {
          setLoaded(true);
        },
        error : () => {
          alert('The loading of audio files failed.');
        }
      });
    } catch (error) {
      alert(error.message);
    }
  }, [loaded, createOneshotSettingsCallback]);

  return (
    <Provider store={store}>
      <button
        type="button"
        onClick={onClickOscillatorCallback}
        style={{
          backgroundColor: '#fff'
        }}
      >
        {isOscillatorStop ? 'Start' : 'Stop'}
      </button>
      <button
        type="button"
        onClick={onClickOneshotCallback}
        style={{
          marginLeft: '4px',
          backgroundColor: '#fff'
        }}
      >
        {isOneshotStop ? 'Start' : 'Stop'}
      </button>
      <BasicControllers sources={['oscillator', 'oneshot'] as XSoundSource[]} currentSoundSource={'oscillator' as SoundSource} />
    </Provider>
  );
};

export const Primary = Template.bind({});
