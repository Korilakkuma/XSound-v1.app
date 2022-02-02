import React, { useState, useCallback } from 'react';
import { Spacer } from '../../atoms/Spacer';
import { Switch } from '../../atoms/Switch';
import { ValueController } from '../../helpers/ValueController';
import { X } from 'xsound';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Props {
}

export const ChorusFieldset: React.FC<Props> = () => {
  const [chorus, setChorus] = useState<boolean>(false);

  const onChangeStateCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.currentTarget.checked;

    if (checked) {
      X('mixer').module('chorus').activate();
      X('oneshot').module('chorus').activate();
      X('audio').module('chorus').activate();
      X('stream').module('chorus').activate();
      X('noise').module('chorus').activate();
      X('oscillator').module('chorus').activate();
      window.C('oscillator').module('chorus').activate();
    } else {
      X('mixer').module('chorus').deactivate();
      X('oneshot').module('chorus').deactivate();
      X('audio').module('chorus').deactivate();
      X('stream').module('chorus').deactivate();
      X('noise').module('chorus').deactivate();
      X('oscillator').module('chorus').deactivate();
      window.C('oscillator').module('chorus').deactivate();
    }

    setChorus(checked);
  }, []);

  const onChangeTimeCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const time = event.currentTarget.valueAsNumber / 1000;

    X('mixer').module('chorus').param({ time });
    X('oneshot').module('chorus').param({ time });
    X('audio').module('chorus').param({ time });
    X('stream').module('chorus').param({ time });
    X('noise').module('chorus').param({ time });
    X('oscillator').module('chorus').param({ time });
    window.C('oscillator').module('chorus').param({ time });
  }, []);

  const onChangeDepthCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const depth = event.currentTarget.valueAsNumber;

    X('mixer').module('chorus').param({ depth });
    X('oneshot').module('chorus').param({ depth });
    X('audio').module('chorus').param({ depth });
    X('stream').module('chorus').param({ depth });
    X('noise').module('chorus').param({ depth });
    X('oscillator').module('chorus').param({ depth });
    window.C('oscillator').module('chorus').param({ depth });
  }, []);

  const onChangeRateCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const rate = event.currentTarget.valueAsNumber;

    X('oneshot').module('chorus').param({ rate });
    X('audio').module('chorus').param({ rate });
    X('stream').module('chorus').param({ rate });
    X('noise').module('chorus').param({ rate });
    X('oscillator').module('chorus').param({ rate });
    window.C('oscillator').module('chorus').param({ rate });
  }, []);

  const onChangeMixCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const mix = event.currentTarget.valueAsNumber;

    X('oneshot').module('chorus').param({ mix });
    X('audio').module('chorus').param({ mix });
    X('stream').module('chorus').param({ mix });
    X('noise').module('chorus').param({ mix });
    X('oscillator').module('chorus').param({ mix });
    window.C('oscillator').module('chorus').param({ mix });
  }, []);

  const onChangeToneCallabck = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const tone = event.currentTarget.valueAsNumber;

    X('oneshot').module('chorus').param({ tone });
    X('audio').module('chorus').param({ tone });
    X('stream').module('chorus').param({ tone });
    X('noise').module('chorus').param({ tone });
    X('oscillator').module('chorus').param({ tone });
    window.C('oscillator').module('chorus').param({ tone });
  }, []);

  return (
    <div className="ChorusFieldset">
      <fieldset>
        <legend>
          <Switch
            id="chorus-state"
            label="Chorus"
            checked={chorus}
            onChange={onChangeStateCallback}
          />
        </legend>
        <ValueController
          label="Time"
          id="chorus-time"
          defaultValue={0}
          min={0}
          max={50}
          step={1}
          onChange={onChangeTimeCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Depth"
          id="chorus-depth"
          defaultValue={0}
          min={0}
          max={1}
          step={0.01}
          onChange={onChangeDepthCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Rate"
          id="chorus-rate"
          defaultValue={0}
          min={0}
          max={1}
          step={0.01}
          onChange={onChangeRateCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Mix"
          id="chorus-mix"
          defaultValue={0}
          min={0}
          max={1}
          step={0.05}
          onChange={onChangeMixCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Tone"
          id="chorus-tone"
          defaultValue={4000}
          min={20}
          max={8000}
          step={1}
          onChange={onChangeToneCallabck}
        />
        <Spacer space={8} />
      </fieldset>
    </div>
  );
};
