import React, { useState, useCallback } from 'react';
import { XSoundSource } from '../../../types';
import { Spacer } from '../../atoms/Spacer';
import { Switch } from '../../atoms/Switch';
import { ValueController } from '../../helpers/ValueController';
import { X } from 'xsound';

export interface Props {
  sources: XSoundSource[];
}

export const DelayFieldset: React.FC<Props> = (props: Props) => {
  const [delay, setDelay] = useState<boolean>(false);

  const onChangeStateCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const state = event.currentTarget.checked;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('delay').state(state);
    });

    setDelay(state);
  }, [props.sources]);

  const onChangeTimeCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const time = event.currentTarget.valueAsNumber / 1000;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('delay').param('time', time);
    });
  }, [props.sources]);

  const onChangeDryCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const dry = event.currentTarget.valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('delay').param('dry', dry);
    });
  }, [props.sources]);

  const onChangeWetCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const wet = event.currentTarget.valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('delay').param('wet', wet);
    });
  }, [props.sources]);

  const onChangeToneCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const tone = event.currentTarget.valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('delay').param('tone', tone);
    });
  }, [props.sources]);

  const onChangeFeedbackCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const feedback = event.currentTarget.valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('delay').param('feedback', feedback);
    });
  }, [props.sources]);

  return (
    <div className="DelayFieldset">
      <fieldset>
        <legend>
          <Switch
            id="delay-state"
            label="Delay"
            checked={delay}
            onChange={onChangeStateCallback}
          />
        </legend>
        <ValueController
          label="Time"
          id="delay-time"
          defaultValue={0}
          min={0}
          max={1000}
          step={1}
          onChange={onChangeTimeCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Dry"
          id="delay-dry"
          defaultValue={1}
          min={0}
          max={1}
          step={0.05}
          onChange={onChangeDryCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Wet"
          id="delay-wet"
          defaultValue={0}
          min={0}
          max={1}
          step={0.05}
          onChange={onChangeWetCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Tone"
          id="delay-tone"
          defaultValue={4000}
          min={20}
          max={8000}
          step={1}
          onChange={onChangeToneCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Feedback"
          id="delay-feedback"
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
