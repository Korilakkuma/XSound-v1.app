import React, { useState, useCallback } from 'react';
import { Spacer } from '../../atoms/Spacer';
import { Select } from '../../atoms/Select';
import { Switch } from '../../atoms/Switch';
import { ParameterController } from '../../helpers/ParameterController';
import { X } from 'xsound';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Props {
}

export const DistortionFieldset: React.FC<Props> = () => {
  const [distortion, setDistortion] = useState<boolean>(false);
  const [cabinet, setCabinet] = useState<boolean>(false);

  const onChangeStateCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.currentTarget.checked;

    if (checked) {
      X('mixer').module('distortion').activate();
      X('oneshot').module('distortion').activate();
      X('audio').module('distortion').activate();
      X('stream').module('distortion').activate();
      X('noise').module('distortion').activate();
    } else {
      X('mixer').module('distortion').deactivate();
      X('oneshot').module('distortion').deactivate();
      X('audio').module('distortion').deactivate();
      X('stream').module('distortion').deactivate();
      X('noise').module('distortion').deactivate();
    }

    setDistortion(checked);
  }, []);

  const onChangeCurveCallback = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const curve = event.currentTarget.value;

    switch (curve) {
      case 'clean'     :
      case 'crunch'    :
      case 'overdrive' :
      case 'distortion':
      case 'fuzz'      :
        X('mixer').module('distortion').param({ curve });
        X('oneshot').module('distortion').param({ curve });
        X('audio').module('distortion').param({ curve });
        X('stream').module('distortion').param({ curve });
        X('noise').module('distortion').param({ curve });
        break;
      default:
        break;
    }
  }, []);

  const onChangeGainCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const gain = event.currentTarget.valueAsNumber;

    X('mixer').module('distortion').param({ pre: { gain } });
    X('oneshot').module('distortion').param({ pre: { gain } });
    X('audio').module('distortion').param({ pre: { gain } });
    X('stream').module('distortion').param({ pre: { gain } });
    X('noise').module('distortion').param({ pre: { gain } });
  }, []);

  const onChangeLeadGainCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const lead = event.currentTarget.valueAsNumber;

    X('mixer').module('distortion').param({ pre: { lead } });
    X('oneshot').module('distortion').param({ pre: { lead } });
    X('audio').module('distortion').param({ pre: { lead } });
    X('stream').module('distortion').param({ pre: { lead } });
    X('noise').module('distortion').param({ pre: { lead } });
  }, []);

  const onChangeBassCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const bass = event.currentTarget.valueAsNumber;

    X('mixer').module('distortion').param({ post: { bass } });
    X('oneshot').module('distortion').param({ post: { bass } });
    X('audio').module('distortion').param({ post: { bass } });
    X('stream').module('distortion').param({ post: { bass } });
    X('noise').module('distortion').param({ post: { bass } });
  }, []);

  const onChangeMiddleCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const middle = event.currentTarget.valueAsNumber;

    X('mixer').module('distortion').param({ post: { middle } });
    X('oneshot').module('distortion').param({ post: { middle } });
    X('audio').module('distortion').param({ post: { middle } });
    X('stream').module('distortion').param({ post: { middle } });
    X('noise').module('distortion').param({ post: { middle } });
  }, []);

  const onChangeTrebleCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const treble = event.currentTarget.valueAsNumber;

    X('mixer').module('distortion').param({ post: { treble } });
    X('oneshot').module('distortion').param({ post: { treble } });
    X('audio').module('distortion').param({ post: { treble } });
    X('stream').module('distortion').param({ post: { treble } });
    X('noise').module('distortion').param({ post: { treble } });
  }, []);

  const onChangeMiddleFrequencyCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const frequency = event.currentTarget.valueAsNumber;

    X('mixer').module('distortion').param({ post: { frequency } });
    X('oneshot').module('distortion').param({ post: { frequency } });
    X('audio').module('distortion').param({ post: { frequency } });
    X('stream').module('distortion').param({ post: { frequency } });
    X('noise').module('distortion').param({ post: { frequency } });
  }, []);

  const onChangeCabinetCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const state = event.currentTarget.checked;

    X('mixer').module('distortion').param({ cabinet: { state } });
    X('oneshot').module('distortion').param({ post: { state } });
    X('audio').module('distortion').param({ post: { state } });
    X('stream').module('distortion').param({ post: { state } });
    X('noise').module('distortion').param({ post: { state } });

    setCabinet(state);
  }, []);

  return (
    <div className="DistortionFieldset">
      <fieldset>
        <legend>
          <Switch
            label="Distortion"
            checked={distortion}
            labelAsText={false}
            onChange={onChangeStateCallback}
          />
        </legend>
        <Select
          label="Select Distortion"
          values={[
            'clean',
            'crunch',
            'overdrive',
            'distortion',
            'fuzz'
          ]}
          texts={[
            'clean',
            'crunch',
            'overdrive',
            'distortion',
            'fuzz'
          ]}
          disabled={false}
          onChange={onChangeCurveCallback}
        />
        <Spacer space={8} />
        <ParameterController
          label="Gain"
          autoupdate={false}
          defaultValue={0.5}
          min={0}
          max={1}
          step={0.05}
          onChange={onChangeGainCallback}
        />
        <Spacer space={8} />
        <ParameterController
          label="Lead Gain"
          autoupdate={false}
          defaultValue={0.5}
          min={0}
          max={1}
          step={0.05}
          onChange={onChangeLeadGainCallback}
        />
        <Spacer space={8} />
        <ParameterController
          label="Bass"
          autoupdate={false}
          defaultValue={0}
          min={-18}
          max={18}
          step={1}
          onChange={onChangeBassCallback}
        />
        <Spacer space={8} />
        <ParameterController
          label="Middle"
          autoupdate={false}
          defaultValue={0}
          min={-18}
          max={18}
          step={1}
          onChange={onChangeMiddleCallback}
        />
        <Spacer space={8} />
        <ParameterController
          label="Treble"
          autoupdate={false}
          defaultValue={0}
          min={-18}
          max={18}
          step={1}
          onChange={onChangeTrebleCallback}
        />
        <Spacer space={8} />
        <ParameterController
          label="Middle Frequency"
          autoupdate={false}
          defaultValue={500}
          min={20}
          max={8000}
          step={1}
          onChange={onChangeMiddleFrequencyCallback}
        />
        <Spacer space={8} />
        <Switch
          label="cabinet"
          checked={cabinet}
          labelAsText={true}
          onChange={onChangeCabinetCallback}
        />
      </fieldset>
    </div>
  );
};
