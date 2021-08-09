import React, { useState, useCallback } from 'react';
import { XSoundSource } from '../../../types';
import { Spacer } from '../../atoms/Spacer';
import { Switch } from '../../atoms/Switch';
import { ValueController } from '../../helpers/ValueController';
import { X } from 'xsound';

export interface Props {
  sources: XSoundSource[];
}

export const AutopanFieldset: React.FC<Props> = (props: Props) => {
  const [autopan, setAutopan] = useState<boolean>(false);

  const onChangeStateCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const state = event.currentTarget.checked;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('autopanner').state(state);
    });

    window.C('oscillator').module('autopanner').state(state);

    setAutopan(state);
  }, [props.sources]);

  const onChangeDepthCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const depth = event.currentTarget.valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('autopanner').param('depth', depth);
    });

    window.C('oscillator').module('autopanner').param('depth', depth);
  }, [props.sources]);

  const onChangeRateCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const rate = event.currentTarget.valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('autopanner').param('rate', rate);
    });

    window.C('oscillator').module('autopanner').param('rate', rate);
  }, [props.sources]);

  return (
    <div className="AutopanFieldset">
      <fieldset>
        <legend>
          <Switch
            id="autopan-state"
            label="Autopan"
            checked={autopan}
            onChange={onChangeStateCallback}
          />
        </legend>
        <ValueController
          label="Depth"
          id="autopan-depth"
          defaultValue={0}
          min={0}
          max={1}
          step={0.05}
          onChange={onChangeDepthCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Rate"
          id="autopan-rate"
          defaultValue={0}
          min={0}
          max={1}
          step={0.05}
          onChange={onChangeRateCallback}
        />
        <Spacer space={8} />
      </fieldset>
    </div>
  );
};
