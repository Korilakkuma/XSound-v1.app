import React, { useCallback } from 'react';
import { XSoundSource } from '../../../types/types';
import { Spacer } from '../../atoms/Spacer';
import { Switch } from '../../atoms/Switch';
import { ValueController } from '../../helpers/ValueController';
import { X } from 'xsound';

export interface Props {
  sources: XSoundSource[];
}

export const AutopanFieldset: React.FC<Props> = (props: Props) => {
  const onChangeStateCallback = useCallback((event: React.SyntheticEvent) => {
    const state = (event.currentTarget as HTMLInputElement).checked;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('autopanner').state(state);
    });
  }, [props.sources]);

  const onChangeDepthCallback = useCallback((event: React.SyntheticEvent) => {
    const depth = (event.currentTarget as HTMLInputElement).valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('autopanner').param('depth', depth);
    });
  }, [props.sources]);

  const onChangeRateCallback = useCallback((event: React.SyntheticEvent) => {
    const rate = (event.currentTarget as HTMLInputElement).valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('autopanner').param('rate', rate);
    });
  }, [props.sources]);

  return (
    <div className="AutopanFieldset">
      <fieldset>
        <legend>
          <Switch
            id="autopan-state"
            label="Autopan"
            defaultChecked={false}
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
