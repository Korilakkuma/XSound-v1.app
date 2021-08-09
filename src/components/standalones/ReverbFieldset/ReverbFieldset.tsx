import React, { useState, useCallback } from 'react';
import { XSoundSource, RIRInfo } from '../../../types';
import { Spacer } from '../../atoms/Spacer';
import { GroupSelect } from '../../atoms/GroupSelect';
import { Switch } from '../../atoms/Switch';
import { ValueController } from '../../helpers/ValueController';
import { X } from 'xsound';

export interface Props {
  sources: XSoundSource[];
  rirInfos: RIRInfo[];
}

export const ReverbFieldset: React.FC<Props> = (props: Props) => {
  const { sources, rirInfos } = props;

  const [reverb, setReverb] = useState<boolean>(false);

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

  const onChangeStateCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const state = event.currentTarget.checked;

    sources.forEach((source: XSoundSource) => {
      X(source).module('reverb').state(state);
    });

    window.C('oscillator').module('reverb').state(state);

    setReverb(state);
  }, [sources]);

  const onChangeTypeCallback = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const type = parseInt(event.currentTarget.value, 10);

    sources.forEach((source: XSoundSource) => {
      X(source).module('reverb').param('type', type);
    });

    window.C('oscillator').module('reverb').param('type', type);
  }, [sources]);

  const onChangeDryCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const dry = event.currentTarget.valueAsNumber;

    sources.forEach((source: XSoundSource) => {
      X(source).module('reverb').param('dry', dry);
    });

    window.C('oscillator').module('reverb').param('dry', dry);
  }, [sources]);

  const onChangeWetCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const wet = event.currentTarget.valueAsNumber;

    sources.forEach((source: XSoundSource) => {
      X(source).module('reverb').param('wet', wet);
    });

    window.C('oscillator').module('reverb').param('wet', wet);
  }, [sources]);

  const onChangeToneCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const tone = event.currentTarget.valueAsNumber;

    sources.forEach((source: XSoundSource) => {
      X(source).module('reverb').param('tone', tone);
    });

    window.C('oscillator').module('reverb').param('tone', tone);
  }, [sources]);

  return (
    <div className="ReverbFieldset">
      <fieldset>
        <legend>
          <Switch
            id="reverb-state"
            label="Reverb"
            checked={reverb}
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
        <aside><a href="http://legacy.spa.aalto.fi/projects/poririrs/" target="_blank" rel="noopener noreferrer">This website enables to get RIR (Room Impulse Response) files !</a></aside>
      </fieldset>
    </div>
  );
};
