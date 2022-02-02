import React, { useState, useEffect } from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Props, MML } from './MML';
import '../../../main.css';

import { SoundSource } from '../../../types';
import { X } from 'xsound';

export default {
  title    : 'standalones/MML',
  component: MML
} as Meta;

const Template: Story<Props> = () => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);

  const currentSoundSource: SoundSource = 'oscillator';

  useEffect(() => {
    if (loaded) {
      return;
    }

    window.C = X.clone();  // for MML of OscillatorModule

    X('oscillator').setup([true, true, true, true]);
    window.C('oscillator').setup([false, false, false, false]);

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
        onClick={() => setActive(!active)}
        style={{ backgroundColor: '#fff' }}
      >
        {active ? 'Close' : 'Open'}
      </button>
      <MML loadedApp currentSoundSource={currentSoundSource} />
    </React.Fragment>
  );
};

export const Primary = Template.bind({});
