import React, { useState, useCallback } from 'react';
import { Spacer } from '../../atoms/Spacer';
import { Switch } from '../../atoms/Switch';
import { ValueController } from '../../helpers/ValueController';
import { X } from 'xsound';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Props {
}

export const AutopanFieldset: React.FC<Props> = () => {
  const [autopan, setAutopan] = useState<boolean>(false);

  const onChangeStateCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.currentTarget.checked;

    if (checked) {
      X('mixer').module('autopanner').activate();
      X('oneshot').module('autopanner').activate();
      X('audio').module('autopanner').activate();
      X('stream').module('autopanner').activate();
      X('noise').module('autopanner').activate();
      X('oscillator').module('autopanner').activate();
      window.C('oscillator').module('autopanner').activate();
    } else {
      X('mixer').module('autopanner').deactivate();
      X('oneshot').module('autopanner').deactivate();
      X('audio').module('autopanner').deactivate();
      X('stream').module('autopanner').deactivate();
      X('noise').module('autopanner').deactivate();
      X('oscillator').module('autopanner').deactivate();
      window.C('oscillator').module('autopanner').deactivate();
    }

    setAutopan(checked);
  }, []);

  const onChangeDepthCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const depth = event.currentTarget.valueAsNumber;

    X('mixer').module('autopanner').param({ depth });
    X('oneshot').module('autopanner').param({ depth });
    X('audio').module('autopanner').param({ depth });
    X('stream').module('autopanner').param({ depth });
    X('noise').module('autopanner').param({ depth });
    X('oscillator').module('autopanner').param({ depth });
    window.C('oscillator').module('autopanner').param({ depth });
  }, []);

  const onChangeRateCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const rate = event.currentTarget.valueAsNumber;

    X('mixer').module('autopanner').param({ rate });
    X('oneshot').module('autopanner').param({ rate });
    X('audio').module('autopanner').param({ rate });
    X('stream').module('autopanner').param({ rate });
    X('noise').module('autopanner').param({ rate });
    X('oscillator').module('autopanner').param({ rate });
    window.C('oscillator').module('autopanner').param({ rate });
  }, []);

  return (
    <div className="AutopanFieldset">
      <fieldset>
        <legend>
          <Switch
            id="autopan-state"
            label="Autopan"
            checked={autopan}
            onChange={onChangeStateCallback}
          />
        </legend>
        <ValueController
          label="Depth"
          id="autopan-depth"
          defaultValue={0}
          min={0}
          max={1}
          step={0.05}
          onChange={onChangeDepthCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Rate"
          id="autopan-rate"
          defaultValue={0}
          min={0}
          max={1}
          step={0.05}
          onChange={onChangeRateCallback}
        />
        <Spacer space={8} />
      </fieldset>
    </div>
  );
};
