import React, { useState, useCallback } from 'react';
import { Spacer } from '../../atoms/Spacer';
import { Switch } from '../../atoms/Switch';
import { ValueController } from '../../helpers/ValueController';
import { X } from 'xsound';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Props {
}

export const TremoloFieldset: React.FC<Props> = () => {
  const [tremolo, setTremolo] = useState<boolean>(false);

  const onChangeStateCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.currentTarget.checked;

    if (checked) {
      X('mixer').module('tremolo').activate();
      X('oneshot').module('tremolo').activate();
      X('audio').module('tremolo').activate();
      X('stream').module('tremolo').activate();
      X('noise').module('tremolo').activate();
      X('oscillator').module('tremolo').activate();
      window.C('oscillator').module('tremolo').activate();
    } else {
      X('mixer').module('tremolo').deactivate();
      X('oneshot').module('tremolo').deactivate();
      X('audio').module('tremolo').deactivate();
      X('stream').module('tremolo').deactivate();
      X('noise').module('tremolo').deactivate();
      X('oscillator').module('tremolo').deactivate();
      window.C('oscillator').module('tremolo').deactivate();
    }

    setTremolo(checked);
  }, []);

  const onChangeDepthCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const depth = event.currentTarget.valueAsNumber;

    X('mixer').module('tremolo').param({ depth });
    X('oneshot').module('tremolo').param({ depth });
    X('audio').module('tremolo').param({ depth });
    X('stream').module('tremolo').param({ depth });
    X('noise').module('tremolo').param({ depth });
    X('oscillator').module('tremolo').param({ depth });
    window.C('oscillator').module('tremolo').param({ depth });
  }, []);

  const onChangeRateCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const rate = event.currentTarget.valueAsNumber;

    X('mixer').module('tremolo').param({ rate });
    X('oneshot').module('tremolo').param({ rate });
    X('audio').module('tremolo').param({ rate });
    X('stream').module('tremolo').param({ rate });
    X('noise').module('tremolo').param({ rate });
    X('oscillator').module('tremolo').param({ rate });
    window.C('oscillator').module('tremolo').param({ rate });
  }, []);

  return (
    <div className="TremoloFieldset">
      <fieldset>
        <legend>
          <Switch
            id="tremolo-state"
            label="Tremolo"
            checked={tremolo}
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
