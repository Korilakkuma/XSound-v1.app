import React, { useState, useCallback } from 'react';
import { XSoundSource } from '../../../types';
import { Spacer } from '../../atoms/Spacer';
import { Select } from '../../atoms/Select';
import { Switch } from '../../atoms/Switch';
import { ValueController } from '../../helpers/ValueController';
import { X } from 'xsound';

export interface Props {
  sources: XSoundSource[];
}

export const DistortionFieldset: React.FC<Props> = (props: Props) => {
  const [distortion, setDistortion] = useState<boolean>(false);

  const onChangeStateCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const state = event.currentTarget.checked;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('distortion').state(state);
    });

    window.C('oscillator').module('distortion').state(state);

    setDistortion(state);
  }, [props.sources]);

  const onChangeCurveCallback = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const curve = event.currentTarget.value;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('distortion').param('curve', curve);
    });

    window.C('oscillator').module('distortion').param('curve', curve);
  }, [props.sources]);

  const onChangeSamplesCallback = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const samples = parseInt(event.currentTarget.value, 10);

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('distortion').param('samples', samples);
    });

    window.C('oscillator').module('distortion').param('samples', samples);
  }, [props.sources]);

  const onChangeAmountCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const amount = event.currentTarget.valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('distortion').param('amount', amount);
    });

    window.C('oscillator').module('distortion').param('amount', amount);
  }, [props.sources]);

  const onChangeDriveCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const drive = event.currentTarget.valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('distortion').param('drive', drive);
    });

    window.C('oscillator').module('distortion').param('drive', drive);
  }, [props.sources]);

  const onChangeColorCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const color = event.currentTarget.valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('distortion').param('color', color);
    });

    window.C('oscillator').module('distortion').param('color', color);
  }, [props.sources]);

  const onChangeToneCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const tone = event.currentTarget.valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('distortion').param('tone', tone);
    });

    window.C('oscillator').module('distortion').param('tone', tone);
  }, [props.sources]);

  return (
    <div className="DistortionFieldset">
      <fieldset>
        <legend>
          <Switch
            id="distortion-state"
            label="Distortion"
            checked={distortion}
            onChange={onChangeStateCallback}
          />
        </legend>
        <Select
          id="select-distortion"
          label="Select Distortion"
          values={[
            'clean',
            'crunch',
            'overdrive',
            'distortion',
            'fuzz'
          ]}
          texts={[
            'clean',
            'crunch',
            'overdrive',
            'distortion',
            'fuzz'
          ]}
          disabled={false}
          onChange={onChangeCurveCallback}
        />
        <Spacer space={8} />
        <Select
          id="select-curve-size"
          label="Select Curve Size"
          values={[
            '8',
            '16',
            '32',
            '64',
            '128',
            '256',
            '512',
            '1024',
            '2048',
            '4096',
            '8192',
            '16384',
            '32768',
            '65536'
          ]}
          texts={[
            '8',
            '16',
            '32',
            '64',
            '128',
            '256',
            '512',
            '1024',
            '2048',
            '4096',
            '8192',
            '16384',
            '32768',
            '65536'
          ]}
          disabled={false}
          onChange={onChangeSamplesCallback}
          defaultValue="32768"
        />
        <Spacer space={8} />
        <ValueController
          label="Amount"
          id="distortion-amount"
          defaultValue={0.5}
          min={0.05}
          max={0.95}
          step={0.05}
          onChange={onChangeAmountCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Drive"
          id="distortion-drive"
          defaultValue={1}
          min={0}
          max={100}
          step={1}
          onChange={onChangeDriveCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Color"
          id="distortion-color"
          defaultValue={2000}
          min={20}
          max={2000}
          step={1}
          onChange={onChangeColorCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Tone"
          id="distortion-tone"
          defaultValue={4000}
          min={20}
          max={8000}
          step={1}
          onChange={onChangeToneCallback}
        />
        <Spacer space={8} />
      </fieldset>
    </div>
  );
};
