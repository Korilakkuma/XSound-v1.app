import React, { useCallback, useState } from 'react';
import { X } from 'xsound';

import { Spacer } from '/src/components/atoms/Spacer';
import { Switch } from '/src/components/atoms/Switch';
import { ParameterController } from '/src/components/helpers/ParameterController';

export const WahFieldset: React.FC = () => {
  const [wah, setWah] = useState<boolean>(false);

  const onChangeStateCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.currentTarget.checked;

    if (checked) {
      X('mixer').module('wah').activate();
      X('oneshot').module('wah').activate();
      X('audio').module('wah').activate();
      X('stream').module('wah').activate();
      X('noise').module('wah').activate();
    } else {
      X('mixer').module('wah').deactivate();
      X('oneshot').module('wah').deactivate();
      X('audio').module('wah').deactivate();
      X('stream').module('wah').deactivate();
      X('noise').module('wah').deactivate();
    }

    setWah(checked);
  }, []);

  const onChangeCutoffCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const cutoff = event.currentTarget.valueAsNumber;

    X('mixer').module('wah').param({ cutoff });
    X('oneshot').module('wah').param({ cutoff });
    X('audio').module('wah').param({ cutoff });
    X('stream').module('wah').param({ cutoff });
    X('noise').module('wah').param({ cutoff });
  }, []);

  const onChangeDepthCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const depth = event.currentTarget.valueAsNumber;

    X('mixer').module('wah').param({ depth });
    X('oneshot').module('wah').param({ depth });
    X('audio').module('wah').param({ depth });
    X('stream').module('wah').param({ depth });
    X('noise').module('wah').param({ depth });
  }, []);

  const onChangeRateCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const rate = event.currentTarget.valueAsNumber;

    X('mixer').module('wah').param({ rate });
    X('oneshot').module('wah').param({ rate });
    X('audio').module('wah').param({ rate });
    X('stream').module('wah').param({ rate });
    X('noise').module('wah').param({ rate });
  }, []);

  const onChangeResonanceCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const resonance = event.currentTarget.valueAsNumber;

    X('mixer').module('wah').param({ resonance });
    X('oneshot').module('wah').param({ resonance });
    X('audio').module('wah').param({ resonance });
    X('stream').module('wah').param({ resonance });
    X('noise').module('wah').param({ resonance });
  }, []);

  return (
    <div className='WahFieldset'>
      <fieldset>
        <legend>
          <Switch label='Wah' checked={wah} labelAsText={false} onChange={onChangeStateCallback} />
        </legend>
        <ParameterController label='Cutoff' autoupdate={false} defaultValue={350} min={350} max={8000} step={1} onChange={onChangeCutoffCallback} />
        <Spacer space={8} />
        <ParameterController label='Depth' autoupdate={false} defaultValue={0} min={0} max={0.9} step={0.01} onChange={onChangeDepthCallback} />
        <Spacer space={8} />
        <ParameterController label='Rate' autoupdate={false} defaultValue={0} min={0} max={10} step={0.05} onChange={onChangeRateCallback} />
        <Spacer space={8} />
        <ParameterController label='Resonance' autoupdate={false} defaultValue={1} min={1} max={20} step={1} onChange={onChangeResonanceCallback} />
        <Spacer space={8} />
      </fieldset>
    </div>
  );
};
