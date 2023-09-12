import React, { useCallback, useState } from 'react';
import { X } from 'xsound';

import { Select } from '/src/components/atoms/Select';
import { Spacer } from '/src/components/atoms/Spacer';
import { Switch } from '/src/components/atoms/Switch';
import { ParameterController } from '/src/components/helpers/ParameterController';

type BoosterType = 'overdrive' | 'fuzz';

export const BoosterFieldset: React.FC = () => {
  const [booster, setBooster] = useState<boolean>(false);
  const [boosterType, setBoosterType] = useState<BoosterType>('overdrive');

  const onChangeStateCallback = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const checked = event.currentTarget.checked;

      if (checked) {
        switch (boosterType) {
          case 'overdrive':
            X('mixer').module('overdrive').activate();
            X('oneshot').module('overdrive').activate();
            X('audio').module('overdrive').activate();
            X('stream').module('overdrive').activate();
            X('noise').module('overdrive').activate();

            X('mixer').module('fuzz').deactivate();
            X('oneshot').module('fuzz').deactivate();
            X('audio').module('fuzz').deactivate();
            X('stream').module('fuzz').deactivate();
            X('noise').module('fuzz').deactivate();

            break;
          case 'fuzz':
            X('mixer').module('fuzz').activate();
            X('oneshot').module('fuzz').activate();
            X('audio').module('fuzz').activate();
            X('stream').module('fuzz').activate();
            X('noise').module('fuzz').activate();

            X('mixer').module('overdrive').deactivate();
            X('oneshot').module('overdrive').deactivate();
            X('audio').module('overdrive').deactivate();
            X('stream').module('overdrive').deactivate();
            X('noise').module('overdrive').deactivate();
            break;
          default:
            break;
        }
      } else {
        X('mixer').module('overdrive').deactivate();
        X('oneshot').module('overdrive').deactivate();
        X('audio').module('overdrive').deactivate();
        X('stream').module('overdrive').deactivate();
        X('noise').module('overdrive').deactivate();

        X('mixer').module('fuzz').deactivate();
        X('oneshot').module('fuzz').deactivate();
        X('audio').module('fuzz').deactivate();
        X('stream').module('fuzz').deactivate();
        X('noise').module('fuzz').deactivate();
      }

      setBooster(checked);
    },
    [boosterType]
  );

  const onChangeTypeCallback = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const type = event.currentTarget.value;

    switch (type) {
      case 'overdrive':
      case 'fuzz':
        setBoosterType(type);
        break;
      default:
        break;
    }
  }, []);

  const onChangeDriveCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const drive = event.currentTarget.valueAsNumber;

    X('mixer').module('overdrive').param({ drive });
    X('oneshot').module('overdrive').param({ drive });
    X('audio').module('overdrive').param({ drive });
    X('stream').module('overdrive').param({ drive });
    X('noise').module('overdrive').param({ drive });

    X('mixer').module('fuzz').param({ drive });
    X('oneshot').module('fuzz').param({ drive });
    X('audio').module('fuzz').param({ drive });
    X('stream').module('fuzz').param({ drive });
    X('noise').module('fuzz').param({ drive });
  }, []);

  const onChangeLevelCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const level = event.currentTarget.valueAsNumber;

    X('mixer').module('overdrive').param({ level });
    X('oneshot').module('overdrive').param({ level });
    X('audio').module('overdrive').param({ level });
    X('stream').module('overdrive').param({ level });
    X('noise').module('overdrive').param({ level });

    X('mixer').module('fuzz').param({ level });
    X('oneshot').module('fuzz').param({ level });
    X('audio').module('fuzz').param({ level });
    X('stream').module('fuzz').param({ level });
    X('noise').module('fuzz').param({ level });
  }, []);

  return (
    <div className='BoosterFieldset'>
      <fieldset>
        <legend>
          <Switch label='OD/DS' checked={booster} labelAsText={false} onChange={onChangeStateCallback} />
        </legend>
        <Select label='Select OD/DS' values={['overdrive', 'fuzz']} texts={['overdrive', 'fuzz']} disabled={false} onChange={onChangeTypeCallback} />
        <Spacer space={8} />
        <ParameterController label='Drive' autoupdate={false} defaultValue={0} min={0} max={1} step={0.05} onChange={onChangeDriveCallback} />
        <Spacer space={8} />
        <ParameterController label='Level' autoupdate={false} defaultValue={0} min={0} max={1} step={0.05} onChange={onChangeLevelCallback} />
      </fieldset>
    </div>
  );
};
