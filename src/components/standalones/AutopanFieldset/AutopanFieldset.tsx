import React, { useCallback, useState } from 'react';
import { X } from 'xsound';

import { Spacer } from '/src/components/atoms/Spacer';
import { Switch } from '/src/components/atoms/Switch';
import { ParameterController } from '/src/components/helpers/ParameterController/ParameterController';

export const AutopanFieldset: React.FC = () => {
  const [autopan, setAutopan] = useState<boolean>(false);

  const onChangeStateCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.currentTarget.checked;

    if (checked) {
      X('mixer').module('autopanner').activate();
      X('oneshot').module('autopanner').activate();
      X('audio').module('autopanner').activate();
      X('stream').module('autopanner').activate();
      X('noise').module('autopanner').activate();
    } else {
      X('mixer').module('autopanner').deactivate();
      X('oneshot').module('autopanner').deactivate();
      X('audio').module('autopanner').deactivate();
      X('stream').module('autopanner').deactivate();
      X('noise').module('autopanner').deactivate();
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
  }, []);

  const onChangeRateCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const rate = event.currentTarget.valueAsNumber;

    X('mixer').module('autopanner').param({ rate });
    X('oneshot').module('autopanner').param({ rate });
    X('audio').module('autopanner').param({ rate });
    X('stream').module('autopanner').param({ rate });
    X('noise').module('autopanner').param({ rate });
  }, []);

  return (
    <div className='AutopanFieldset'>
      <fieldset>
        <legend>
          <Switch label='Autopan' checked={autopan} labelAsText={false} onChange={onChangeStateCallback} />
        </legend>
        <ParameterController label='Depth' autoupdate={false} defaultValue={0} min={0} max={1} step={0.05} onChange={onChangeDepthCallback} />
        <Spacer space={8} />
        <ParameterController label='Rate' autoupdate={false} defaultValue={0} min={0} max={1} step={0.05} onChange={onChangeRateCallback} />
        <Spacer space={8} />
      </fieldset>
    </div>
  );
};
