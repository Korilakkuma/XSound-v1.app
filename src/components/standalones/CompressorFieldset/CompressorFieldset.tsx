import React, { useCallback } from 'react';
import { XSoundSource } from '../../../types';
import { Spacer } from '../../atoms/Spacer';
import { Switch } from '../../atoms/Switch';
import { ValueController } from '../../helpers/ValueController';
import { X } from 'xsound';

export interface Props {
  sources: XSoundSource[];
}

export const CompressorFieldset: React.FC<Props> = (props: Props) => {
  const onChangeStateCallback = useCallback((event: React.SyntheticEvent) => {
    const state = (event.currentTarget as HTMLInputElement).checked;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('compressor').state(state);
    });
  }, [props.sources]);

  const onChangeThresholdCallback = useCallback((event: React.SyntheticEvent) => {
    const threshold = (event.currentTarget as HTMLInputElement).valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('compressor').param('threshold', threshold);
    });
  }, [props.sources]);

  const onChangeKneeCallback = useCallback((event: React.SyntheticEvent) => {
    const knee = (event.currentTarget as HTMLInputElement).valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('compressor').param('knee', knee);
    });
  }, [props.sources]);

  const onChangeRatioCallback = useCallback((event: React.SyntheticEvent) => {
    const ratio = (event.currentTarget as HTMLInputElement).valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('compressor').param('ratio', ratio);
    });
  }, [props.sources]);

  const onChangeAttackCallback = useCallback((event: React.SyntheticEvent) => {
    const attack = (event.currentTarget as HTMLInputElement).valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('compressor').param('attack', attack);
    });
  }, [props.sources]);

  const onChangeReleaseCallback = useCallback((event: React.SyntheticEvent) => {
    const release = (event.currentTarget as HTMLInputElement).valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('compressor').param('release', release);
    });
  }, [props.sources]);

  return (
    <div className="CompressorFieldset">
      <fieldset>
        <legend>
          <Switch
            defaultChecked
            id="compressor-state"
            label="Compressor"
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
