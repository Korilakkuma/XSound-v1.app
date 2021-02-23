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

  const onChangeStateCallback = useCallback((event: React.SyntheticEvent) => {
    const state = (event.currentTarget as HTMLInputElement).checked;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('distortion').state(state);
    });

    setDistortion(state);
  }, [props.sources]);

  const onChangeCurveCallback = useCallback((event: React.SyntheticEvent) => {
    const curve = (event.currentTarget as HTMLInputElement).value;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('distortion').param('curve', curve);
    });
  }, [props.sources]);

  const onChangeSamplesCallback = useCallback((event: React.SyntheticEvent) => {
    const samples = parseInt((event.currentTarget as HTMLInputElement).value, 10);

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('distortion').param('samples', samples);
    });
  }, [props.sources]);

  const onChangeAmountCallback = useCallback((event: React.SyntheticEvent) => {
    const amount = (event.currentTarget as HTMLInputElement).valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('distortion').param('amount', amount);
    });
  }, [props.sources]);

  const onChangeDriveCallback = useCallback((event: React.SyntheticEvent) => {
    const drive = (event.currentTarget as HTMLInputElement).valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('distortion').param('drive', drive);
    });
  }, [props.sources]);

  const onChangeColorCallback = useCallback((event: React.SyntheticEvent) => {
    const color = (event.currentTarget as HTMLInputElement).valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('distortion').param('color', color);
    });
  }, [props.sources]);

  const onChangeToneCallback = useCallback((event: React.SyntheticEvent) => {
    const tone = (event.currentTarget as HTMLInputElement).valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('distortion').param('tone', tone);
    });
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
            'CLEAN',
            'CRUNCH',
            'OVERDRIVE',
            'DISTORTION',
            'FUZZ'
          ]}
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
