import React, { useCallback, useState } from 'react';
import { X } from 'xsound';

import { Spacer } from '/src/components/atoms/Spacer';
import { Switch } from '/src/components/atoms/Switch';
import { ParameterController } from '/src/components/helpers/ParameterController';

export const DelayFieldset: React.FC = () => {
  const [delay, setDelay] = useState<boolean>(false);

  const onChangeStateCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.currentTarget.checked;

    if (checked) {
      X('mixer').module('delay').activate();
      X('oneshot').module('delay').activate();
      X('audio').module('delay').activate();
      X('stream').module('delay').activate();
      X('noise').module('delay').activate();
    } else {
      X('mixer').module('delay').deactivate();
      X('oneshot').module('delay').deactivate();
      X('audio').module('delay').deactivate();
      X('stream').module('delay').deactivate();
      X('noise').module('delay').deactivate();
    }

    setDelay(checked);
  }, []);

  const onChangeTimeCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const time = event.currentTarget.valueAsNumber / 1000;

    X('mixer').module('delay').param({ time });
    X('oneshot').module('delay').param({ time });
    X('audio').module('delay').param({ time });
    X('stream').module('delay').param({ time });
    X('noise').module('delay').param({ time });
  }, []);

  const onChangeDryCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const dry = event.currentTarget.valueAsNumber;

    X('mixer').module('delay').param({ dry });
    X('oneshot').module('delay').param({ dry });
    X('audio').module('delay').param({ dry });
    X('stream').module('delay').param({ dry });
    X('noise').module('delay').param({ dry });
  }, []);

  const onChangeWetCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const wet = event.currentTarget.valueAsNumber;

    X('mixer').module('delay').param({ wet });
    X('oneshot').module('delay').param({ wet });
    X('audio').module('delay').param({ wet });
    X('stream').module('delay').param({ wet });
    X('noise').module('delay').param({ wet });
  }, []);

  const onChangeToneCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const tone = event.currentTarget.valueAsNumber;

    X('mixer').module('delay').param({ tone });
    X('oneshot').module('delay').param({ tone });
    X('audio').module('delay').param({ tone });
    X('stream').module('delay').param({ tone });
    X('noise').module('delay').param({ tone });
  }, []);

  const onChangeFeedbackCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const feedback = event.currentTarget.valueAsNumber;

    X('mixer').module('delay').param({ feedback });
    X('oneshot').module('delay').param({ feedback });
    X('audio').module('delay').param({ feedback });
    X('stream').module('delay').param({ feedback });
    X('noise').module('delay').param({ feedback });
  }, []);

  return (
    <div className='DelayFieldset'>
      <fieldset>
        <legend>
          <Switch label='Delay' checked={delay} labelAsText={false} onChange={onChangeStateCallback} />
        </legend>
        <ParameterController label='Time' autoupdate={false} defaultValue={0} min={0} max={1000} step={1} onChange={onChangeTimeCallback} />
        <Spacer space={8} />
        <ParameterController label='Dry' autoupdate={false} defaultValue={1} min={0} max={1} step={0.05} onChange={onChangeDryCallback} />
        <Spacer space={8} />
        <ParameterController label='Wet' autoupdate={false} defaultValue={0} min={0} max={1} step={0.05} onChange={onChangeWetCallback} />
        <Spacer space={8} />
        <ParameterController label='Tone' autoupdate={false} defaultValue={4000} min={20} max={8000} step={1} onChange={onChangeToneCallback} />
        <Spacer space={8} />
        <ParameterController label='Feedback' autoupdate={false} defaultValue={0} min={0} max={0.95} step={0.05} onChange={onChangeFeedbackCallback} />
        <Spacer space={8} />
      </fieldset>
    </div>
  );
};
