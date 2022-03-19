import React, { useState, useCallback } from 'react';
import { Spacer } from '../../atoms/Spacer';
import { Switch } from '../../atoms/Switch';
import { ValueController } from '../../helpers/ValueController';
import { X } from 'xsound';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Props {
}

export const FlangerFieldset: React.FC<Props> = () => {
  const [flanger, setFlanger] = useState<boolean>(false);

  const onChangeStateCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.currentTarget.checked;

    if (checked) {
      X('mixer').module('flanger').activate();
      X('oneshot').module('flanger').activate();
      X('audio').module('flanger').activate();
      X('stream').module('flanger').activate();
      X('noise').module('flanger').activate();
    } else {
      X('mixer').module('flanger').deactivate();
      X('oneshot').module('flanger').deactivate();
      X('audio').module('flanger').deactivate();
      X('stream').module('flanger').deactivate();
      X('noise').module('flanger').deactivate();
    }

    setFlanger(checked);
  }, []);

  const onChangeTimeCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const time = event.currentTarget.valueAsNumber / 1000;

    X('mixer').module('flanger').param({ time });
    X('oneshot').module('flanger').param({ time });
    X('audio').module('flanger').param({ time });
    X('stream').module('flanger').param({ time });
    X('noise').module('flanger').param({ time });
  }, []);

  const onChangeDepthCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const depth = event.currentTarget.valueAsNumber;

    X('mixer').module('flanger').param({ depth });
    X('oneshot').module('flanger').param({ depth });
    X('audio').module('flanger').param({ depth });
    X('stream').module('flanger').param({ depth });
    X('noise').module('flanger').param({ depth });
  }, []);

  const onChangeRateCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const rate = event.currentTarget.valueAsNumber;

    X('mixer').module('flanger').param({ rate });
    X('oneshot').module('flanger').param({ rate });
    X('audio').module('flanger').param({ rate });
    X('stream').module('flanger').param({ rate });
    X('noise').module('flanger').param({ rate });
  }, []);

  const onChangeMixCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const mix = event.currentTarget.valueAsNumber;

    X('mixer').module('flanger').param({ mix });
    X('oneshot').module('flanger').param({ mix });
    X('audio').module('flanger').param({ mix });
    X('stream').module('flanger').param({ mix });
    X('noise').module('flanger').param({ mix });
  }, []);

  const onChangeToneCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const tone = event.currentTarget.valueAsNumber;

    X('mixer').module('flanger').param({ tone });
    X('oneshot').module('flanger').param({ tone });
    X('audio').module('flanger').param({ tone });
    X('stream').module('flanger').param({ tone });
    X('noise').module('flanger').param({ tone });
  }, []);

  const onChangeFeedbackCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const feedback = event.currentTarget.valueAsNumber;

    X('mixer').module('flanger').param({ feedback });
    X('oneshot').module('flanger').param({ feedback });
    X('audio').module('flanger').param({ feedback });
    X('stream').module('flanger').param({ feedback });
    X('noise').module('flanger').param({ feedback });
  }, []);

  return (
    <div className="FlangerFieldset">
      <fieldset>
        <legend>
          <Switch
            id="flanger-state"
            label="Flanger"
            checked={flanger}
            onChange={onChangeStateCallback}
          />
        </legend>
        <ValueController
          label="Time"
          id="flanger-time"
          defaultValue={0}
          min={0}
          max={10}
          step={0.05}
          onChange={onChangeTimeCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Depth"
          id="flanger-depth"
          defaultValue={0}
          min={0}
          max={1}
          step={0.01}
          onChange={onChangeDepthCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Rate"
          id="flanger-rate"
          defaultValue={0}
          min={0}
          max={10}
          step={0.05}
          onChange={onChangeRateCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Mix"
          id="flanger-mix"
          defaultValue={0}
          min={0}
          max={1}
          step={0.05}
          onChange={onChangeMixCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Tone"
          id="flanger-tone"
          defaultValue={4000}
          min={20}
          max={8000}
          step={1}
          onChange={onChangeToneCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Feedback"
          id="flanger-feedback"
          defaultValue={0}
          min={0}
          max={0.95}
          step={0.05}
          onChange={onChangeFeedbackCallback}
        />
        <Spacer space={8} />
      </fieldset>
    </div>
  );
};
