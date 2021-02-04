import React, { useCallback } from 'react';
import { Spacer } from '../../atoms/Spacer';
import { Switch } from '../../atoms/Switch';
import { ValueController } from '../../helpers/ValueController';
import { X } from 'xsound';

export interface Props {
  sources: string[];
}

export const TremoloFieldset: React.FC<Props> = (props: Props) => {
  const onChangeStateCallback = useCallback((event: React.SyntheticEvent) => {
    const state = (event.currentTarget as HTMLInputElement).checked;

    props.sources.forEach((source: string) => {
      X(source).module('tremolo').state(state);
    });
  }, [props.sources]);

  const onChangeDepthCallback = useCallback((event: React.SyntheticEvent) => {
    const depth = (event.currentTarget as HTMLInputElement).valueAsNumber;

    props.sources.forEach((source: string) => {
      X(source).module('tremolo').param('depth', depth);
    });
  }, [props.sources]);

  const onChangeRateCallback = useCallback((event: React.SyntheticEvent) => {
    const rate = (event.currentTarget as HTMLInputElement).valueAsNumber;

    props.sources.forEach((source: string) => {
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
            defaultChecked={false}
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
