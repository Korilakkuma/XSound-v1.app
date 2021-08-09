import React, { useState, useCallback } from 'react';
import { XSoundSource } from '../../../types';
import { Spacer } from '../../atoms/Spacer';
import { Switch } from '../../atoms/Switch';
import { ValueController } from '../../helpers/ValueController';
import { X } from 'xsound';

export interface Props {
  sources: XSoundSource[];
}

export const WahFieldset: React.FC<Props> = (props: Props) => {
  const [wah, setWah] = useState<boolean>(false);

  const onChangeStateCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const state = event.currentTarget.checked;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('wah').state(state);
    });

    window.C('oscillator').module('wah').state(state);

    setWah(state);
  }, [props.sources]);

  const onChangeCutoffCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const cutoff = event.currentTarget.valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('wah').param('cutoff', cutoff);
    });

    window.C('oscillator').module('wah').param('cutoff', cutoff);
  }, [props.sources]);

  const onChangeDepthCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const depth = event.currentTarget.valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('wah').param('depth', depth);
    });

    window.C('oscillator').module('wah').param('depth', depth);
  }, [props.sources]);

  const onChangeRateCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const rate = event.currentTarget.valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('wah').param('rate', rate);
    });

    window.C('oscillator').module('wah').param('rate', rate);
  }, [props.sources]);

  const onChangeResonanceCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const resonance = event.currentTarget.valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('wah').param('resonance', resonance);
    });

    window.C('oscillator').module('wah').param('resonance', resonance);
  }, [props.sources]);

  return (
    <div className="WahFieldset">
      <fieldset>
        <legend>
          <Switch
            id="wah-state"
            label="Wah"
            checked={wah}
            onChange={onChangeStateCallback}
          />
        </legend>
        <ValueController
          label="Cutoff"
          id="wah-cutoff"
          defaultValue={350}
          min={350}
          max={8000}
          step={1}
          onChange={onChangeCutoffCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Depth"
          id="wah-depth"
          defaultValue={0}
          min={0}
          max={0.9}
          step={0.01}
          onChange={onChangeDepthCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Rate"
          id="wah-rate"
          defaultValue={0}
          min={0}
          max={10}
          step={0.05}
          onChange={onChangeRateCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Resonance"
          id="wah-resonance"
          defaultValue={1}
          min={1}
          max={20}
          step={1}
          onChange={onChangeResonanceCallback}
        />
        <Spacer space={8} />
      </fieldset>
    </div>
  );
};
