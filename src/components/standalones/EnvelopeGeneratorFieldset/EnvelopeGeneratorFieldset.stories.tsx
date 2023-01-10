/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useCallback } from 'react';
import type { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { EnvelopeGeneratorFieldset } from './EnvelopeGeneratorFieldset';
import '../../../main.css';

import '../../../types';
import { X } from 'xsound';

export default {
  component: EnvelopeGeneratorFieldset
} as ComponentMeta<typeof EnvelopeGeneratorFieldset>;

const Template: ComponentStoryObj<typeof EnvelopeGeneratorFieldset> = {
  render: () => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const [isStop, setIsStop] = useState<boolean>(true);

    const onClickCallback = useCallback(() => {
      if (isStop) {
        X('oscillator').start(X.toFrequencies([40, (40 + 4), (40 + 7), (40 + 10)]));
        window.C('oscillator').start(X.toFrequencies([28, (28 + 4), (28 + 7), (28 + 10)]));
      } else {
        X('oscillator').stop();
        window.C('oscillator').stop();
      }

      setIsStop(!isStop);
    }, [isStop]);

    useEffect(() => {
      if (loaded) {
        return;
      }

      window.C = X.clone();

      X('oscillator').setup([true, true, true, true]);
      window.C('oscillator').setup([true, true, true, true]);

      for (let i = 0, len = X('oscillator').length(); i < len; i++) {
        X('oscillator').get(i).param({ type: 'sawtooth' });
        window.C('oscillator').get(i).param({ type: 'sawtooth' });
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
