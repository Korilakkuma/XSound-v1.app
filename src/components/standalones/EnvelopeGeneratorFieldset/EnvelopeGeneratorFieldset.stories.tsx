/* eslint-disable react-hooks/rules-of-hooks */
import React, { useCallback, useEffect, useState } from 'react';
import { X } from 'xsound';

import { EnvelopeGeneratorFieldset } from './EnvelopeGeneratorFieldset';

import type { Meta, StoryObj } from '@storybook/react';

import '../../../types';

import '../../../main.css';

export default {
  component: EnvelopeGeneratorFieldset
} as Meta<typeof EnvelopeGeneratorFieldset>;

const Template: StoryObj<typeof EnvelopeGeneratorFieldset> = {
  render: () => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const [isStop, setIsStop] = useState<boolean>(true);

    const onClickCallback = useCallback(() => {
      if (isStop) {
        X('oscillator').start(X.toFrequencies([40, (40 + 4), (40 + 7), (40 + 10)]));
      } else {
        X('oscillator').stop();
      }

      setIsStop(!isStop);
    }, [isStop]);

    useEffect(() => {
      if (loaded) {
        return;
      }

      window.clonedXSound = X.clone();

      X('oscillator').setup([true, true, true, true]);
      window.clonedXSound('oscillator').setup([true, true, true, true]);

      for (let i = 0, len = X('oscillator').length(); i < len; i++) {
        X('oscillator').get(i).param({ type: 'sawtooth' });
        window.clonedXSound('oscillator').get(i).param({ type: 'sawtooth' });
      }

      setLoaded(true);
    }, [loaded]);

    return (
      <React.Fragment>
        <button
          type="button"
          onClick={onClickCallback}
          style={{ backgroundColor: '#fff' }}
        >
          {isStop ? 'Start' : 'Stop'}
        </button>
        <EnvelopeGeneratorFieldset />
      </React.Fragment>
    );
  }
};

export const Primary = {
  ...Template
};
