import React, { useState, useCallback } from 'react';
import { Spacer } from '../../atoms/Spacer';
import { Switch } from '../../atoms/Switch';
import { ValueController } from '../../helpers/ValueController';
import { X } from 'xsound';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Props {
}

export const EqualizerFieldset: React.FC<Props> = () => {
  const [equalizer, setEqualizer] = useState<boolean>(false);

  const onChangeStateCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.currentTarget.checked;

    if (checked) {
      X('mixer').module('equalizer').activate();
      X('oneshot').module('equalizer').activate();
      X('audio').module('equalizer').activate();
      X('stream').module('equalizer').activate();
      X('noise').module('equalizer').activate();
    } else {
      X('mixer').module('equalizer').deactivate();
      X('oneshot').module('equalizer').deactivate();
      X('audio').module('equalizer').deactivate();
      X('stream').module('equalizer').deactivate();
      X('noise').module('equalizer').deactivate();
    }

    setEqualizer(checked);
  }, []);

  const onChangeBassCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const bass = event.currentTarget.valueAsNumber;

    X('mixer').module('equalizer').param({ bass });
    X('oneshot').module('equalizer').param({ bass });
    X('audio').module('equalizer').param({ bass });
    X('stream').module('equalizer').param({ bass });
    X('noise').module('equalizer').param({ bass });
  }, []);

  const onChangeMiddleCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const middle = event.currentTarget.valueAsNumber;

    X('mixer').module('equalizer').param({ middle });
    X('oneshot').module('equalizer').param({ middle });
    X('audio').module('equalizer').param({ middle });
    X('stream').module('equalizer').param({ middle });
    X('noise').module('equalizer').param({ middle });
  }, []);

  const onChangeTrebleCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const treble = event.currentTarget.valueAsNumber;

    X('mixer').module('equalizer').param({ treble });
    X('oneshot').module('equalizer').param({ treble });
    X('audio').module('equalizer').param({ treble });
    X('stream').module('equalizer').param({ treble });
    X('noise').module('equalizer').param({ treble });
  }, []);

  const onChangePresenceCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const presence = event.currentTarget.valueAsNumber;

    X('mixer').module('equalizer').param({ presence });
    X('oneshot').module('equalizer').param({ presence });
    X('audio').module('equalizer').param({ presence });
    X('stream').module('equalizer').param({ presence });
    X('noise').module('equalizer').param({ presence });
  }, []);

  return (
    <div className="EqualizerFieldset">
      <fieldset>
        <legend>
          <Switch
            id="equalizer-state"
            label="Equalizer"
            checked={equalizer}
            onChange={onChangeStateCallback}
          />
        </legend>
        <ValueController
          label="Bass"
          id="equalizer-bass"
          defaultValue={0}
          min={-18}
          max={18}
          step={1}
          onChange={onChangeBassCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Middle"
          id="equalizer-middle"
          defaultValue={0}
          min={-18}
          max={18}
          step={1}
          onChange={onChangeMiddleCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Treble"
          id="equalizer-treble"
          defaultValue={0}
          min={-18}
          max={18}
          step={1}
          onChange={onChangeTrebleCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Presence"
          id="equalizer-presence"
          defaultValue={0}
          min={-18}
          max={18}
          step={1}
          onChange={onChangePresenceCallback}
        />
        <Spacer space={8} />
      </fieldset>
    </div>
  );
};
