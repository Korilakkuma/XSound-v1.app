import React, { useState, useCallback } from 'react';
import { XSoundSource } from '../../../types';
import { Spacer } from '../../atoms/Spacer';
import { Switch } from '../../atoms/Switch';
import { ValueController } from '../../helpers/ValueController';
import { X } from 'xsound';

export interface Props {
  sources: XSoundSource[];
}

export const RingModulatorFieldset: React.FC<Props> = (props: Props) => {
  const [ringmodulator, setRingmodulator] = useState<boolean>(false);

  const onChangeStateCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const state = event.currentTarget.checked;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('ringmodulator').state(state);
    });

    setRingmodulator(state);
  }, [props.sources]);

  const onChangeDepthCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const depth = event.currentTarget.valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('ringmodulator').param('depth', depth);
    });
  }, [props.sources]);

  const onChangeRateCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const rate = event.currentTarget.valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('ringmodulator').param('rate', rate);
    });
  }, [props.sources]);

  return (
    <div className="RingModulatorFieldset">
      <fieldset>
        <legend>
          <Switch
            id="ringmodulator-state"
            label="Ring MOD."
            checked={ringmodulator}
            onChange={onChangeStateCallback}
          />
        </legend>
        <ValueController
          label="Depth"
          id="ringmodulator-depth"
          defaultValue={0}
          min={0}
          max={1}
          step={0.05}
          onChange={onChangeDepthCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Rate"
          id="ringmodulator-rate"
          defaultValue={0}
          min={0}
          max={1500}
          step={1}
          onChange={onChangeRateCallback}
        />
        <Spacer space={8} />
      </fieldset>
    </div>
  );
};
