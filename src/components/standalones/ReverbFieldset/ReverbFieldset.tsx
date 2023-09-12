import React, { useCallback, useState } from 'react';
import { X } from 'xsound';

import { GroupSelect } from '/src/components/atoms/GroupSelect';
import { Spacer } from '/src/components/atoms/Spacer';
import { Switch } from '/src/components/atoms/Switch';
import { ParameterController } from '/src/components/helpers/ParameterController';

import type { RIRDescriptor } from '/src/types';

export type Props = {
  rirDescriptors: RIRDescriptor[];
};

export const ReverbFieldset: React.FC<Props> = (props: Props) => {
  const { rirDescriptors } = props;

  const [reverb, setReverb] = useState<boolean>(false);

  const groups: string[] = [];
  const values: { [group: string]: string[] } = {};
  const texts: { [group: string]: string[] } = {};

  rirDescriptors.forEach((rirDescriptor: RIRDescriptor) => {
    const { value, label, group } = rirDescriptor;

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
    const checked = event.currentTarget.checked;

    if (checked) {
      X('mixer').module('reverb').activate();
      X('oneshot').module('reverb').activate();
      X('audio').module('reverb').activate();
      X('stream').module('reverb').activate();
      X('noise').module('reverb').activate();
    } else {
      X('mixer').module('reverb').deactivate();
      X('oneshot').module('reverb').deactivate();
      X('audio').module('reverb').deactivate();
      X('stream').module('reverb').deactivate();
      X('noise').module('reverb').deactivate();
    }

    setReverb(checked);
  }, []);

  const onChangeTypeCallback = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const buffer = Number(event.currentTarget.value);

    X('mixer').module('reverb').param({ buffer });
    X('oneshot').module('reverb').param({ buffer });
    X('audio').module('reverb').param({ buffer });
    X('stream').module('reverb').param({ buffer });
    X('noise').module('reverb').param({ buffer });
  }, []);

  const onChangeDryCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const dry = event.currentTarget.valueAsNumber;

    X('mixer').module('reverb').param({ dry });
    X('oneshot').module('reverb').param({ dry });
    X('audio').module('reverb').param({ dry });
    X('stream').module('reverb').param({ dry });
    X('noise').module('reverb').param({ dry });
  }, []);

  const onChangeWetCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const wet = event.currentTarget.valueAsNumber;

    X('mixer').module('reverb').param({ wet });
    X('oneshot').module('reverb').param({ wet });
    X('audio').module('reverb').param({ wet });
    X('stream').module('reverb').param({ wet });
    X('noise').module('reverb').param({ wet });
  }, []);

  const onChangeToneCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const tone = event.currentTarget.valueAsNumber;

    X('mixer').module('reverb').param({ tone });
    X('oneshot').module('reverb').param({ tone });
    X('audio').module('reverb').param({ tone });
    X('stream').module('reverb').param({ tone });
    X('noise').module('reverb').param({ tone });
  }, []);

  return (
    <div className='ReverbFieldset'>
      <fieldset>
        <legend>
          <Switch label='Reverb' checked={reverb} labelAsText={false} onChange={onChangeStateCallback} />
        </legend>
        <GroupSelect label='Select Reverb' groups={groups} values={values} texts={texts} onChange={onChangeTypeCallback} />
        <Spacer space={8} />
        <ParameterController label='Dry' autoupdate={false} defaultValue={1} min={0} max={1} step={0.05} onChange={onChangeDryCallback} />
        <Spacer space={8} />
        <ParameterController label='Wet' autoupdate={false} defaultValue={0} min={0} max={1} step={0.05} onChange={onChangeWetCallback} />
        <Spacer space={8} />
        <ParameterController label='Tone' autoupdate={false} defaultValue={4000} min={20} max={8000} step={1} onChange={onChangeToneCallback} />
        <Spacer space={8} />
        <aside>
          <a href='http://legacy.spa.aalto.fi/projects/poririrs/' target='_blank' rel='noopener noreferrer'>
            This website enables to get RIR (Room Impulse Response) files !
          </a>
        </aside>
      </fieldset>
    </div>
  );
};
