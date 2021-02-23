import React, { useState, useCallback } from 'react';
import { XSoundSource } from '../../../types';
import { Spacer } from '../../atoms/Spacer';
import { Switch } from '../../atoms/Switch';
import { ValueController } from '../../helpers/ValueController';
import { X } from 'xsound';

export interface Props {
  sources: XSoundSource[];
}

export const FlangerFieldset: React.FC<Props> = (props: Props) => {
  const [flanger, setFlanger] = useState<boolean>(false);

  const onChangeStateCallback = useCallback((event: React.SyntheticEvent) => {
    const state = (event.currentTarget as HTMLInputElement).checked;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('flanger').state(state);
    });

    setFlanger(state);
  }, [props.sources]);

  const onChangeTimeCallback = useCallback((event: React.SyntheticEvent) => {
    const time = (event.currentTarget as HTMLInputElement).valueAsNumber / 1000;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('flanger').param('time', time);
    });
  }, [props.sources]);

  const onChangeDepthCallback = useCallback((event: React.SyntheticEvent) => {
    const depth = (event.currentTarget as HTMLInputElement).valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('flanger').param('depth', depth);
    });
  }, [props.sources]);

  const onChangeRateCallback = useCallback((event: React.SyntheticEvent) => {
    const rate = (event.currentTarget as HTMLInputElement).valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('flanger').param('rate', rate);
    });
  }, [props.sources]);

  const onChangeMixCallback = useCallback((event: React.SyntheticEvent) => {
    const mix = (event.currentTarget as HTMLInputElement).valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('flanger').param('mix', mix);
    });
  }, [props.sources]);

  const onChangeToneCallback = useCallback((event: React.SyntheticEvent) => {
    const tone = (event.currentTarget as HTMLInputElement).valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('flanger').param('tone', tone);
    });
  }, [props.sources]);

  const onChangeFeedbackCallback = useCallback((event: React.SyntheticEvent) => {
    const feedback = (event.currentTarget as HTMLInputElement).valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('flanger').param('feedback', feedback);
    });
  }, [props.sources]);

  return (
    <div className="FlangerFieldset">
      <fieldset>
        <legend>
          <Switch
            id="flanger-state"
            label="Flanger"
            checked={flanger}
            onChange={onChangeStateCallback}
          />
        </legend>
        <ValueController
          label="Time"
          id="flanger-time"
          defaultValue={0}
          min={0}
          max={10}
          step={0.05}
          onChange={onChangeTimeCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Depth"
          id="flanger-depth"
          defaultValue={0}
          min={0}
          max={1}
          step={0.01}
          onChange={onChangeDepthCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Rate"
          id="flanger-rate"
          defaultValue={0}
          min={0}
          max={10}
          step={0.05}
          onChange={onChangeRateCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Mix"
          id="flanger-mix"
          defaultValue={0}
          min={0}
          max={1}
          step={0.05}
          onChange={onChangeMixCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Tone"
          id="flanger-tone"
          defaultValue={4000}
          min={20}
          max={8000}
          step={1}
          onChange={onChangeToneCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Feedback"
          id="flanger-feedback"
          defaultValue={0}
          min={0}
          max={0.95}
          step={0.05}
          onChange={onChangeFeedbackCallback}
        />
        <Spacer space={8} />
      </fieldset>
    </div>
  );
};
