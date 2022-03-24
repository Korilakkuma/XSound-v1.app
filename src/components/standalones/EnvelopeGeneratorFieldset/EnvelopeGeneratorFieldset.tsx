import React, { useCallback } from 'react';
import { Spacer } from '../../atoms/Spacer';
import { ParameterController } from '../../helpers/ParameterController';
import { X } from 'xsound';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Props {
}

export const EnvelopeGeneratorFieldset: React.FC<Props> = () => {
  const onChangeAttackCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const attack = event.currentTarget.valueAsNumber;

    X('oscillator').module('envelopegenerator').param({ attack });
    window.C('oscillator').module('envelopegenerator').param({ attack });
    X('oneshot').module('envelopegenerator').param({ attack });
    X('noise').module('envelopegenerator').param({ attack });
  }, []);

  const onChangeDecayCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const decay = event.currentTarget.valueAsNumber;

    X('oscillator').module('envelopegenerator').param({ decay });
    window.C('oscillator').module('envelopegenerator').param({ decay });
    X('oneshot').module('envelopegenerator').param({ decay });
    X('noise').module('envelopegenerator').param({ decay });
  }, []);

  const onChangeSustainCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const sustain = event.currentTarget.valueAsNumber;

    X('oscillator').module('envelopegenerator').param({ sustain });
    window.C('oscillator').module('envelopegenerator').param({ sustain });
    X('oneshot').module('envelopegenerator').param({ sustain });
    X('noise').module('envelopegenerator').param({ sustain });
  }, []);

  const onChangeReleaseCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const release = event.currentTarget.valueAsNumber;

    X('oscillator').module('envelopegenerator').param({ release });
    window.C('oscillator').module('envelopegenerator').param({ release });
    X('oneshot').module('envelopegenerator').param({ release });
    X('noise').module('envelopegenerator').param({ release });
  }, []);

  return (
    <div className="EnvelopeGeneratorFieldset">
      <fieldset>
        <legend>Envelope Generator</legend>
        <ParameterController
          label="Attack"
          id="envelope-generator-attack"
          defaultValue={0.01}
          min={0}
          max={1}
          step={0.01}
          onChange={onChangeAttackCallback}
        />
        <Spacer space={8} />
        <ParameterController
          label="Decay"
          id="envelope-generator-decay"
          defaultValue={0.3}
          min={0}
          max={1}
          step={0.01}
          onChange={onChangeDecayCallback}
        />
        <Spacer space={8} />
        <ParameterController
          label="Sustain"
          id="envelope-generator-sustain"
          defaultValue={0.5}
          min={0}
          max={1}
          step={0.01}
          onChange={onChangeSustainCallback}
        />
        <Spacer space={8} />
        <ParameterController
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
