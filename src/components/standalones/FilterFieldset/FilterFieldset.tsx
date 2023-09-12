import React, { useCallback, useState } from 'react';
import { X } from 'xsound';

import { Select } from '/src/components/atoms/Select';
import { Spacer } from '/src/components/atoms/Spacer';
import { Switch } from '/src/components/atoms/Switch';
import { ParameterController } from '/src/components/helpers/ParameterController';

export const FilterFieldset: React.FC = () => {
  const [filter, setFilter] = useState<boolean>(false);

  const onChangeStateCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.currentTarget.checked;

    if (checked) {
      X('mixer').module('filter').activate();
      X('oneshot').module('filter').activate();
      X('audio').module('filter').activate();
      X('stream').module('filter').activate();
      X('noise').module('filter').activate();
    } else {
      X('mixer').module('filter').deactivate();
      X('oneshot').module('filter').deactivate();
      X('audio').module('filter').deactivate();
      X('stream').module('filter').deactivate();
      X('noise').module('filter').deactivate();
    }

    setFilter(checked);
  }, []);

  const onChangeTypeCallback = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const type = event.currentTarget.value;

    switch (type) {
      case 'lowpass':
      case 'highpass':
      case 'bandpass':
      case 'lowshelf':
      case 'highshelf':
      case 'peaking':
      case 'notch':
      case 'allpass':
        X('mixer').module('filter').param({ type });
        X('oneshot').module('filter').param({ type });
        X('audio').module('filter').param({ type });
        X('stream').module('filter').param({ type });
        X('noise').module('filter').param({ type });
        break;
      default:
        break;
    }
  }, []);

  const onChangeFrequencyCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const frequency = event.currentTarget.valueAsNumber;

    X('mixer').module('filter').param({ frequency });
    X('oneshot').module('filter').param({ frequency });
    X('audio').module('filter').param({ frequency });
    X('stream').module('filter').param({ frequency });
    X('noise').module('filter').param({ frequency });
  }, []);

  const onChangeQualityCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const Q = event.currentTarget.valueAsNumber;

    X('mixer').module('filter').param({ Q });
    X('oneshot').module('filter').param({ Q });
    X('audio').module('filter').param({ Q });
    X('stream').module('filter').param({ Q });
    X('noise').module('filter').param({ Q });
  }, []);

  const onChangeGainCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const gain = event.currentTarget.valueAsNumber;

    X('mixer').module('filter').param({ gain });
    X('oneshot').module('filter').param({ gain });
    X('audio').module('filter').param({ gain });
    X('stream').module('filter').param({ gain });
    X('noise').module('filter').param({ gain });
  }, []);

  const onChangeAttackCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const attack = event.currentTarget.valueAsNumber;

    X('mixer').module('filter').param({ attack });
    X('oneshot').module('filter').param({ attack });
    X('audio').module('filter').param({ attack });
    X('stream').module('filter').param({ attack });
    X('noise').module('filter').param({ attack });
  }, []);

  const onChangeDecayCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const decay = event.currentTarget.valueAsNumber;

    X('mixer').module('filter').param({ decay });
    X('oneshot').module('filter').param({ decay });
    X('audio').module('filter').param({ decay });
    X('stream').module('filter').param({ decay });
    X('noise').module('filter').param({ decay });
  }, []);

  const onChangeSustainCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const sustain = event.currentTarget.valueAsNumber;

    X('mixer').module('filter').param({ sustain });
    X('oneshot').module('filter').param({ sustain });
    X('audio').module('filter').param({ sustain });
    X('stream').module('filter').param({ sustain });
    X('noise').module('filter').param({ sustain });
  }, []);

  const onChangeReleaseCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const release = event.currentTarget.valueAsNumber;

    X('mixer').module('filter').param({ release });
    X('oneshot').module('filter').param({ release });
    X('audio').module('filter').param({ release });
    X('stream').module('filter').param({ release });
    X('noise').module('filter').param({ release });
  }, []);

  return (
    <div className='FilterFieldset'>
      <fieldset>
        <legend>
          <Switch label='Filter' checked={filter} labelAsText={false} onChange={onChangeStateCallback} />
        </legend>
        <Select
          label='Select Filter'
          values={['lowpass', 'highpass', 'bandpass', 'lowshelf', 'highshelf', 'peaking', 'notch', 'allpass']}
          texts={['lowpass', 'highpass', 'bandpass', 'lowshelf', 'highshelf', 'peaking', 'notch', 'allpass']}
          disabled={false}
          onChange={onChangeTypeCallback}
        />
        <Spacer space={8} />
        <ParameterController label='Frequency' autoupdate={false} defaultValue={8000} min={20} max={22050} step={1} onChange={onChangeFrequencyCallback} />
        <Spacer space={8} />
        <ParameterController label='Quality' autoupdate={false} defaultValue={1} min={1} max={20} step={1} onChange={onChangeQualityCallback} />
        <Spacer space={8} />
        <ParameterController label='Gain' autoupdate={false} defaultValue={0} min={-18} max={18} step={1} onChange={onChangeGainCallback} />
        <Spacer space={8} />
        <ParameterController label='Attack' autoupdate={false} defaultValue={0.01} min={0} max={1} step={0.01} onChange={onChangeAttackCallback} />
        <Spacer space={8} />
        <ParameterController label='Decay' autoupdate={false} defaultValue={0.3} min={0} max={1} step={0.01} onChange={onChangeDecayCallback} />
        <Spacer space={8} />
        <ParameterController label='Sustain' autoupdate={false} defaultValue={0.5} min={0} max={1} step={0.01} onChange={onChangeSustainCallback} />
        <Spacer space={8} />
        <ParameterController label='Release' autoupdate={false} defaultValue={1} min={0} max={1} step={0.01} onChange={onChangeReleaseCallback} />
        <Spacer space={8} />
      </fieldset>
    </div>
  );
};
