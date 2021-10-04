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
      X(source).module('distortion').param('pre', state);
      X(source).module('distortion').param('post', state);
    });

    window.C('oscillator').module('distortion').state(state);
    window.C('oscillator').module('distortion').param('pre', state);
    window.C('oscillator').module('distortion').param('post', state);

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

  const onChangeHighTrebleGainCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const high = event.currentTarget.valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('distortion').param('high', high);
    });

    window.C('oscillator').module('distortion').param('high', high);
  }, [props.sources]);

  const onChangeNormalGainCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const normal = event.currentTarget.valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('distortion').param('normal', normal);
    });

    window.C('oscillator').module('distortion').param('normal', normal);
  }, [props.sources]);

  const onChangeMiddleFrequencyCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const frequency = event.currentTarget.valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('distortion').param('frequency', frequency);
    });

    window.C('oscillator').module('distortion').param('frequency', frequency);
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
          label="High Treble Gain"
          id="distortion-high-treble-gain"
          defaultValue={1}
          min={0}
          max={1}
          step={0.05}
          onChange={onChangeHighTrebleGainCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Normal Gain"
          id="distortion-normal-gain"
          defaultValue={1}
          min={0}
          max={1}
          step={0.05}
          onChange={onChangeNormalGainCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Middle Frequency"
          id="distortion-middle-frequency"
          defaultValue={500}
          min={20}
          max={22050}
          step={1}
          onChange={onChangeMiddleFrequencyCallback}
        />
        <Spacer space={8} />
      </fieldset>
    </div>
  );
};
