import React, { useCallback } from 'react';
import { Spacer } from '../../atoms/Spacer';
import { ValueController } from '../../helpers/ValueController';
import { X } from 'xsound';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Props {
}

export const EnvelopeGeneratorFieldset: React.FC<Props> = () => {
  const onChangeAttackCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const attack = event.currentTarget.valueAsNumber;

    X('oscillator').module('envelopegenerator').param('attack', attack);
    window.C('oscillator').module('envelopegenerator').param('attack', attack);
    X('oneshot').module('envelopegenerator').param('attack', attack);
  }, []);

  const onChangeDecayCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const decay = event.currentTarget.valueAsNumber;

    X('oscillator').module('envelopegenerator').param('decay', decay);
    window.C('oscillator').module('envelopegenerator').param('decay', decay);
    X('oneshot').module('envelopegenerator').param('decay', decay);
  }, []);

  const onChangeSustainCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const sustain = event.currentTarget.valueAsNumber;

    X('oscillator').module('envelopegenerator').param('sustain', sustain);
    window.C('oscillator').module('envelopegenerator').param('sustain', sustain);
    X('oneshot').module('envelopegenerator').param('sustain', sustain);
  }, []);

  const onChangeReleaseCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const release = event.currentTarget.valueAsNumber;

    X('oscillator').module('envelopegenerator').param('release', release);
    window.C('oscillator').module('envelopegenerator').param('release', release);
    X('oneshot').module('envelopegenerator').param('release', release);
  }, []);

  return (
    <div className="EnvelopeGeneratorFieldset">
      <fieldset>
        <legend>Envelope Generator</legend>
        <ValueController
          label="Attack"
          id="envelope-generator-attack"
          defaultValue={0.01}
          min={0}
          max={1}
          step={0.01}
          onChange={onChangeAttackCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Decay"
          id="envelope-generator-decay"
          defaultValue={0.3}
          min={0}
          max={1}
          step={0.01}
          onChange={onChangeDecayCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Sustain"
          id="envelope-generator-sustain"
          defaultValue={0.5}
          min={0}
          max={1}
          step={0.01}
          onChange={onChangeSustainCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Release"
          id="envelope-generator-release"
          defaultValue={1}
          min={0}
          max={1}
          step={0.01}
          onChange={onChangeReleaseCallback}
        />
        <Spacer space={8} />
      </fieldset>
    </div>
  );
};
