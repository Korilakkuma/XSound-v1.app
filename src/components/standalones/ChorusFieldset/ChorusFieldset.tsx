import React, { useState, useCallback } from 'react';
import { XSoundSource } from '../../../types';
import { Spacer } from '../../atoms/Spacer';
import { Switch } from '../../atoms/Switch';
import { ValueController } from '../../helpers/ValueController';
import { X } from 'xsound';

export interface Props {
  sources: XSoundSource[];
}

export const ChorusFieldset: React.FC<Props> = (props: Props) => {
  const [chorus, setChorus] = useState<boolean>(false);

  const onChangeStateCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const state = event.currentTarget.checked;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('chorus').state(state);
    });

    window.C('oscillator').module('chorus').state(state);

    setChorus(state);
  }, [props.sources]);

  const onChangeTimeCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const time = event.currentTarget.valueAsNumber / 1000;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('chorus').param('time', time);
    });

    window.C('oscillator').module('chorus').param('time', time);
  }, [props.sources]);

  const onChangeDepthCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const depth = event.currentTarget.valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('chorus').param('depth', depth);
    });

    window.C('oscillator').module('chorus').param('depth', depth);
  }, [props.sources]);

  const onChangeRateCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const rate = event.currentTarget.valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('chorus').param('rate', rate);
    });

    window.C('oscillator').module('chorus').param('rate', rate);
  }, [props.sources]);

  const onChangeMixCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const mix = event.currentTarget.valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('chorus').param('mix', mix);
    });

    window.C('oscillator').module('chorus').param('mix', mix);
  }, [props.sources]);

  const onChangeToneCallabck = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const tone = event.currentTarget.valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('chorus').param('tone', tone);
    });

    window.C('oscillator').module('chorus').param('tone', tone);
  }, [props.sources]);

  return (
    <div className="ChorusFieldset">
      <fieldset>
        <legend>
          <Switch
            id="chorus-state"
            label="Chorus"
            checked={chorus}
            onChange={onChangeStateCallback}
          />
        </legend>
        <ValueController
          label="Time"
          id="chorus-time"
          defaultValue={0}
          min={0}
          max={50}
          step={1}
          onChange={onChangeTimeCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Depth"
          id="chorus-depth"
          defaultValue={0}
          min={0}
          max={1}
          step={0.01}
          onChange={onChangeDepthCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Rate"
          id="chorus-rate"
          defaultValue={0}
          min={0}
          max={1}
          step={0.01}
          onChange={onChangeRateCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Mix"
          id="chorus-mix"
          defaultValue={0}
          min={0}
          max={1}
          step={0.05}
          onChange={onChangeMixCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Tone"
          id="chorus-tone"
          defaultValue={4000}
          min={20}
          max={8000}
          step={1}
          onChange={onChangeToneCallabck}
        />
        <Spacer space={8} />
      </fieldset>
    </div>
  );
};
