import React, { useCallback } from 'react';
import { RIRInfo } from '../../../types/types';
import { Spacer } from '../../atoms/Spacer';
import { GroupSelect } from '../../atoms/GroupSelect';
import { Switch } from '../../atoms/Switch';
import { ValueController } from '../../helpers/ValueController';
import { X } from 'xsound';

export interface Props {
  sources: string[];
  rirInfos: RIRInfo[];
}

export const ReverbFieldset: React.FC<Props> = (props: Props) => {
  const { sources, rirInfos } = props;

  const groups: string[] = [];
  const values: { [group: string]: string[] } = {};
  const texts: { [group: string]: string[] } = {};

  rirInfos.forEach((rirInfo: RIRInfo) => {
    const { value, label, group } = rirInfo;

    if (!groups.includes(group)) {
      groups.push(group);
    }

    if (Array.isArray(values[group])) {
      values[group].push(value.toString(10));
    } else {
      values[group] = [value.toString(10)];
    }

    if (Array.isArray(texts[group])) {
      texts[group].push(label);
    } else {
      texts[group] = [label];
    }
  });

  const onChangeStateCallback = useCallback((event: React.SyntheticEvent) => {
    const state = (event.currentTarget as HTMLInputElement).checked;

    sources.forEach((source: string) => {
      X(source).module('reverb').state(state);
    });
  }, [sources]);

  const onChangeTypeCallback = useCallback((event: React.SyntheticEvent) => {
    const type = parseInt((event.currentTarget as HTMLInputElement).value, 10);

    sources.forEach((source: string) => {
      X(source).module('reverb').param('type', type);
    });
  }, [sources]);

  const onChangeDryCallback = useCallback((event: React.SyntheticEvent) => {
    const dry = (event.currentTarget as HTMLInputElement).valueAsNumber;

    sources.forEach((source: string) => {
      X(source).module('reverb').param('dry', dry);
    });
  }, [sources]);

  const onChangeWetCallback = useCallback((event: React.SyntheticEvent) => {
    const wet = (event.currentTarget as HTMLInputElement).valueAsNumber;

    sources.forEach((source: string) => {
      X(source).module('reverb').param('wet', wet);
    });
  }, [sources]);

  const onChangeToneCallback = useCallback((event: React.SyntheticEvent) => {
    const tone = (event.currentTarget as HTMLInputElement).valueAsNumber;

    sources.forEach((source: string) => {
      X(source).module('reverb').param('tone', tone);
    });
  }, [sources]);

  return (
    <div className="ReverbFieldset">
      <fieldset>
        <legend>
          <Switch
            id="reverb-state"
            label="Reverb"
            defaultChecked={false}
            onChange={onChangeStateCallback}
          />
        </legend>
        <GroupSelect
          id="group-select-reverb"
          label="Select Reverb"
          groups={groups}
          values={values}
          texts={texts}
          onChange={onChangeTypeCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Dry"
          id="reverb-dry"
          defaultValue={1}
          min={0}
          max={1}
          step={0.05}
          onChange={onChangeDryCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Wet"
          id="reverb-wet"
          defaultValue={0}
          min={0}
          max={1}
          step={0.05}
          onChange={onChangeWetCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Tone"
          id="reverb-tone"
          defaultValue={4000}
          min={20}
          max={8000}
          step={1}
          onChange={onChangeToneCallback}
        />
        <Spacer space={8} />
        <aside>Reverb effect requires Impulse Response data. <a href="http://legacy.spa.aalto.fi/projects/poririrs/" target="_blank" rel="noopener noreferrer">Here</a>, you can get Impulse Response file !</aside>
      </fieldset>
    </div>
  );
};
