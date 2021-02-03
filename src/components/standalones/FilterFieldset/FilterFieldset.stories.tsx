import React, { useState, useEffect, useCallback } from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Props, FilterFieldset } from './FilterFieldset';
import '../../../main.css';

import { X } from 'xsound';

export default {
  title    : 'standalones/FilterFieldset',
  component: FilterFieldset
} as Meta;

const Template: Story<Props> = () => {
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

    X('oscillator').setup([true, true, true, true]);

    for (let i = 0, len = X('oscillator').length(); i < len; i++) {
      X('oscillator', i).param('type', 'sawtooth');
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
      <FilterFieldset sources={['oscillator']} />
    </React.Fragment>
  );
};

export const Primary = Template.bind({});
