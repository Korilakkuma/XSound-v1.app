import React, { useCallback, useState } from 'react';
import { X } from 'xsound';

import { Spacer } from '/src/components/atoms/Spacer';
import { Switch } from '/src/components/atoms/Switch';
import { ParameterController } from '/src/components/helpers/ParameterController';

export const TremoloFieldset: React.FC = () => {
  const [tremolo, setTremolo] = useState<boolean>(false);

  const onChangeStateCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.currentTarget.checked;

    if (checked) {
      X('mixer').module('tremolo').activate();
      X('oneshot').module('tremolo').activate();
      X('audio').module('tremolo').activate();
      X('stream').module('tremolo').activate();
      X('noise').module('tremolo').activate();
    } else {
      X('mixer').module('tremolo').deactivate();
      X('oneshot').module('tremolo').deactivate();
      X('audio').module('tremolo').deactivate();
      X('stream').module('tremolo').deactivate();
      X('noise').module('tremolo').deactivate();
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
  }, []);

  const onChangeRateCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const rate = event.currentTarget.valueAsNumber;

    X('mixer').module('tremolo').param({ rate });
    X('oneshot').module('tremolo').param({ rate });
    X('audio').module('tremolo').param({ rate });
    X('stream').module('tremolo').param({ rate });
    X('noise').module('tremolo').param({ rate });
  }, []);

  return (
    <div className='TremoloFieldset'>
      <fieldset>
        <legend>
          <Switch label='Tremolo' checked={tremolo} labelAsText={false} onChange={onChangeStateCallback} />
        </legend>
        <ParameterController label='Depth' autoupdate={false} defaultValue={0} min={0} max={1} step={0.05} onChange={onChangeDepthCallback} />
        <Spacer space={8} />
        <ParameterController label='Rate' autoupdate={false} defaultValue={0} min={0} max={25} step={0.05} onChange={onChangeRateCallback} />
        <Spacer space={8} />
      </fieldset>
    </div>
  );
};
