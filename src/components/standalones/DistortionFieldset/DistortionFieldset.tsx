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
  const [cabinet, setCabinet] = useState<boolean>(false);

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

  const onChangeGainCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const gain = event.currentTarget.valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('distortion').param('gain', gain);
    });

    window.C('oscillator').module('distortion').param('gain', gain);
  }, [props.sources]);

  const onChangeLeadGainCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const lead = event.currentTarget.valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('distortion').param('lead', lead);
    });

    window.C('oscillator').module('distortion').param('lead', lead);
  }, [props.sources]);

  const onChangeBassCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const bass = event.currentTarget.valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('distortion').param('bass', bass);
    });

    window.C('oscillator').module('distortion').param('bass', bass);
  }, [props.sources]);

  const onChangeMiddleCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const middle = event.currentTarget.valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('distortion').param('middle', middle);
    });

    window.C('oscillator').module('distortion').param('middle', middle);
  }, [props.sources]);

  const onChangeTrebleCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const treble = event.currentTarget.valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('distortion').param('treble', treble);
    });

    window.C('oscillator').module('distortion').param('treble', treble);
  }, [props.sources]);

  const onChangeMiddleFrequencyCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const frequency = event.currentTarget.valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('distortion').param('frequency', frequency);
    });

    window.C('oscillator').module('distortion').param('frequency', frequency);
  }, [props.sources]);

  const onChangeCabinetCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const cabinet = event.currentTarget.checked;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('distortion').param('cabinet', cabinet);
    });

    window.C('oscillator').module('distortion').param('cabinet', cabinet);

    setCabinet(cabinet);
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
        <ValueController
          label="Gain"
          id="distortion-gain"
          defaultValue={0.5}
          min={0}
          max={1}
          step={0.05}
          onChange={onChangeGainCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Lead Gain"
          id="distortion-lead-gain"
          defaultValue={0.5}
          min={0}
          max={1}
          step={0.05}
          onChange={onChangeLeadGainCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Bass"
          id="distortion-bass"
          defaultValue={0}
          min={-18}
          max={18}
          step={1}
          onChange={onChangeBassCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Middle"
          id="distortion-middle"
          defaultValue={0}
          min={-18}
          max={18}
          step={1}
          onChange={onChangeMiddleCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Treble"
          id="distortion-treble"
          defaultValue={0}
          min={-18}
          max={18}
          step={1}
          onChange={onChangeTrebleCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Middle Frequency"
          id="distortion-middle-frequency"
          defaultValue={500}
          min={20}
          max={8000}
          step={1}
          onChange={onChangeMiddleFrequencyCallback}
        />
        <Spacer space={8} />
        <Switch
          id="distortion-cabinet"
          label="cabinet"
          checked={cabinet}
          onChange={onChangeCabinetCallback}
        />
      </fieldset>
    </div>
  );
};
