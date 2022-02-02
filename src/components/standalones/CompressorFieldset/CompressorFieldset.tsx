import React, { useState, useCallback } from 'react';
import { Spacer } from '../../atoms/Spacer';
import { Switch } from '../../atoms/Switch';
import { ValueController } from '../../helpers/ValueController';
import { X } from 'xsound';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Props {
}

export const CompressorFieldset: React.FC<Props> = () => {
  const [compressor, setCompressor] = useState<boolean>(true);

  const onChangeStateCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.currentTarget.checked;

    if (checked) {
      X('mixer').module('compressor').activate();
      X('oneshot').module('compressor').activate();
      X('audio').module('compressor').activate();
      X('stream').module('compressor').activate();
      X('noise').module('compressor').activate();
      X('oscillator').module('compressor').activate();
      window.C('oscillator').module('compressor').activate();
    } else {
      X('mixer').module('compressor').deactivate();
      X('oneshot').module('compressor').deactivate();
      X('audio').module('compressor').deactivate();
      X('stream').module('compressor').deactivate();
      X('noise').module('compressor').deactivate();
      X('oscillator').module('compressor').deactivate();
      window.C('oscillator').module('compressor').deactivate();
    }

    setCompressor(checked);
  }, []);

  const onChangeThresholdCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const threshold = event.currentTarget.valueAsNumber;

    X('mixer').module('compressor').param({ threshold });
    X('oneshot').module('compressor').param({ threshold });
    X('audio').module('compressor').param({ threshold });
    X('stream').module('compressor').param({ threshold });
    X('noise').module('compressor').param({ threshold });
    X('oscillator').module('compressor').param({ threshold });
    window.C('oscillator').module('compressor').param({ threshold });
  }, []);

  const onChangeKneeCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const knee = event.currentTarget.valueAsNumber;

    X('mixer').module('compressor').param({ knee });
    X('oneshot').module('compressor').param({ knee });
    X('audio').module('compressor').param({ knee });
    X('stream').module('compressor').param({ knee });
    X('noise').module('compressor').param({ knee });
    X('oscillator').module('compressor').param({ knee });
    window.C('oscillator').module('compressor').param({ knee });
  }, []);

  const onChangeRatioCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const ratio = event.currentTarget.valueAsNumber;

    X('mixer').module('compressor').param({ ratio });
    X('oneshot').module('compressor').param({ ratio });
    X('audio').module('compressor').param({ ratio });
    X('stream').module('compressor').param({ ratio });
    X('noise').module('compressor').param({ ratio });
    X('oscillator').module('compressor').param({ ratio });
    window.C('oscillator').module('compressor').param({ ratio });
  }, []);

  const onChangeAttackCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const attack = event.currentTarget.valueAsNumber;

    X('mixer').module('compressor').param({ attack });
    X('oneshot').module('compressor').param({ attack });
    X('audio').module('compressor').param({ attack });
    X('stream').module('compressor').param({ attack });
    X('noise').module('compressor').param({ attack });
    X('oscillator').module('compressor').param({ attack });
    window.C('oscillator').module('compressor').param({ attack });
  }, []);

  const onChangeReleaseCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const release = event.currentTarget.valueAsNumber;

    X('mixer').module('compressor').param({ release });
    X('oneshot').module('compressor').param({ release });
    X('audio').module('compressor').param({ release });
    X('stream').module('compressor').param({ release });
    X('noise').module('compressor').param({ release });
    X('oscillator').module('compressor').param({ release });
    window.C('oscillator').module('compressor').param({ release });
  }, []);

  return (
    <div className="CompressorFieldset">
      <fieldset>
        <legend>
          <Switch
            id="compressor-state"
            label="Compressor"
            checked={compressor}
            onChange={onChangeStateCallback}
          />
        </legend>
        <ValueController
          label="Threshold"
          id="compressor-threshold"
          defaultValue={-24}
          min={-100}
          max={0}
          step={1}
          onChange={onChangeThresholdCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Knee"
          id="compressor-knee"
          defaultValue={30}
          min={0}
          max={40}
          step={1}
          onChange={onChangeKneeCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Ratio"
          id="compressor-ratio"
          defaultValue={12}
          min={1}
          max={20}
          step={1}
          onChange={onChangeRatioCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Attack"
          id="compressor-attack"
          defaultValue={0.003}
          min={0}
          max={1}
          step={0.001}
          onChange={onChangeAttackCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Release"
          id="compressor-release"
          defaultValue={0.25}
          min={0.01}
          max={1}
          step={0.01}
          onChange={onChangeReleaseCallback}
        />
        <Spacer space={8} />
      </fieldset>
    </div>
  );
};
