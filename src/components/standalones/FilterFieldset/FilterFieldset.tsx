import React, { useCallback } from 'react';
import { XSoundSource } from '../../../types';
import { Spacer } from '../../atoms/Spacer';
import { Select } from '../../atoms/Select';
import { Switch } from '../../atoms/Switch';
import { ValueController } from '../../helpers/ValueController';
import { X } from 'xsound';

export interface Props {
  sources: XSoundSource[];
}

export const FilterFieldset: React.FC<Props> = (props: Props) => {
  const onChangeStateCallback = useCallback((event: React.SyntheticEvent) => {
    const state = (event.currentTarget as HTMLInputElement).checked;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('filter').state(state);
    });
  }, [props.sources]);

  const onChangeTypeCallback = useCallback((event: React.SyntheticEvent) => {
    const type = (event.currentTarget as HTMLInputElement).value;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('filter').param('type', type);
    });
  }, [props.sources]);

  const onChangeFrequencyCallback = useCallback((event: React.SyntheticEvent) => {
    const frequency = (event.currentTarget as HTMLInputElement).valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('filter').param('frequency', frequency);
    });
  }, [props.sources]);

  const onChangeQualityCallback = useCallback((event: React.SyntheticEvent) => {
    const quality = (event.currentTarget as HTMLInputElement).valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('filter').param('Q', quality);
    });
  }, [props.sources]);

  const onChangeGainCallback = useCallback((event: React.SyntheticEvent) => {
    const gain = (event.currentTarget as HTMLInputElement).valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('filter').param('gain', gain);
    });
  }, [props.sources]);

  const onChangeAttackCallback = useCallback((event: React.SyntheticEvent) => {
    const attack = (event.currentTarget as HTMLInputElement).valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('filter').param('attack', attack);
    });
  }, [props.sources]);

  const onChangeDecayCallback = useCallback((event: React.SyntheticEvent) => {
    const decay = (event.currentTarget as HTMLInputElement).valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('filter').param('decay', decay);
    });
  }, [props.sources]);

  const onChangeSustainCallback = useCallback((event: React.SyntheticEvent) => {
    const sustain = (event.currentTarget as HTMLInputElement).valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('filter').param('sustain', sustain);
    });
  }, [props.sources]);

  const onChangeReleaseCallback = useCallback((event: React.SyntheticEvent) => {
    const release = (event.currentTarget as HTMLInputElement).valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('filter').param('release', release);
    });
  }, [props.sources]);

  return (
    <div className="FilterFieldset">
      <fieldset>
        <legend>
          <Switch
            id="filter-state"
            label="Filter"
            defaultChecked={false}
            onChange={onChangeStateCallback}
          />
        </legend>
        <Select
          id="select-filter"
          label="Select Filter"
          values={[
            'lowpass',
            'highpass',
            'bandpass',
            'lowshelf',
            'highshelf',
            'peaking',
            'notch',
            'allpass'
          ]}
          texts={[
            'LOWPASS',
            'HIGHPASS',
            'BANDPASS',
            'LOWSHELF',
            'HIGHSHELF',
            'PEAKING',
            'NOTCH',
            'ALLPASS'
          ]}
          onChange={onChangeTypeCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Frequency"
          id="filter-frequency"
          defaultValue={8000}
          min={20}
          max={22050}
          step={1}
          onChange={onChangeFrequencyCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Quality"
          id="filter-quality"
          defaultValue={1}
          min={1}
          max={20}
          step={1}
          onChange={onChangeQualityCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Gain"
          id="filter-gain"
          defaultValue={0}
          min={-18}
          max={18}
          step={1}
          onChange={onChangeGainCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Attack"
          id="filter-attack"
          defaultValue={0.01}
          min={0}
          max={1}
          step={0.01}
          onChange={onChangeAttackCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Decay"
          id="filter-decay"
          defaultValue={0.3}
          min={0}
          max={1}
          step={0.01}
          onChange={onChangeDecayCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Sustain"
          id="filter-sustain"
          defaultValue={0.5}
          min={0}
          max={1}
          step={0.01}
          onChange={onChangeSustainCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Release"
          id="filter-release"
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
