import React, { useState, useCallback } from 'react';
import { XSoundSource } from '../../../types';
import { Spacer } from '../../atoms/Spacer';
import { Switch } from '../../atoms/Switch';
import { ValueController } from '../../helpers/ValueController';
import { X } from 'xsound';

export interface Props {
  sources: XSoundSource[];
}

export const TremoloFieldset: React.FC<Props> = (props: Props) => {
  const [tremolo, setTremolo] = useState<boolean>(false);

  const onChangeStateCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const state = event.currentTarget.checked;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('tremolo').state(state);
    });

    setTremolo(state);
  }, [props.sources]);

  const onChangeDepthCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const depth = event.currentTarget.valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('tremolo').param('depth', depth);
    });
  }, [props.sources]);

  const onChangeRateCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const rate = event.currentTarget.valueAsNumber;

    props.sources.forEach((source: XSoundSource) => {
      X(source).module('tremolo').param('rate', rate);
    });
  }, [props.sources]);

  return (
    <div className="TremoloFieldset">
      <fieldset>
        <legend>
          <Switch
            id="tremolo-state"
            label="Tremolo"
            checked={tremolo}
            onChange={onChangeStateCallback}
          />
        </legend>
        <ValueController
          label="Depth"
          id="tremolo-depth"
          defaultValue={0}
          min={0}
          max={1}
          step={0.05}
          onChange={onChangeDepthCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Rate"
          id="tremolo-rate"
          defaultValue={0}
          min={0}
          max={25}
          step={0.05}
          onChange={onChangeRateCallback}
        />
        <Spacer space={8} />
      </fieldset>
    </div>
  );
};
