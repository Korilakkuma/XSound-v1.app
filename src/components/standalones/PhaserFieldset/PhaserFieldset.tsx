import React, { useCallback, useState } from 'react';
import { X } from 'xsound';

import { Select } from '/src/components/atoms/Select';
import { Spacer } from '/src/components/atoms/Spacer';
import { Switch } from '/src/components/atoms/Switch';
import { ParameterController } from '/src/components/helpers/ParameterController';

export const PhaserFieldset: React.FC = () => {
  const [phaser, setPhaser] = useState<boolean>(false);

  const onChangeStateCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.currentTarget.checked;

    if (checked) {
      X('mixer').module('phaser').activate();
      X('oneshot').module('phaser').activate();
      X('audio').module('phaser').activate();
      X('stream').module('phaser').activate();
      X('noise').module('phaser').activate();
    } else {
      X('mixer').module('phaser').deactivate();
      X('oneshot').module('phaser').deactivate();
      X('audio').module('phaser').deactivate();
      X('stream').module('phaser').deactivate();
      X('noise').module('phaser').deactivate();
    }

    setPhaser(checked);
  }, []);

  const onChangeStageCallback = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const stage = Number(event.currentTarget.value);

    switch (stage) {
      case 2:
      case 4:
      case 8:
      case 12:
      case 24:
        X('mixer').module('phaser').param({ stage });
        X('oneshot').module('phaser').param({ stage });
        X('audio').module('phaser').param({ stage });
        X('stream').module('phaser').param({ stage });
        X('noise').module('phaser').param({ stage });

        break;
      default:
        break;
    }
  }, []);

  const onChangeFrequencyCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const frequency = event.currentTarget.valueAsNumber;

    X('mixer').module('phaser').param({ frequency });
    X('oneshot').module('phaser').param({ frequency });
    X('audio').module('phaser').param({ frequency });
    X('stream').module('phaser').param({ frequency });
    X('noise').module('phaser').param({ frequency });
  }, []);

  const onChangeDepthCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const depth = event.currentTarget.valueAsNumber;

    X('mixer').module('phaser').param({ depth });
    X('oneshot').module('phaser').param({ depth });
    X('audio').module('phaser').param({ depth });
    X('stream').module('phaser').param({ depth });
    X('noise').module('phaser').param({ depth });
  }, []);

  const onChangeRateCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const rate = event.currentTarget.valueAsNumber;

    X('mixer').module('phaser').param({ rate });
    X('oneshot').module('phaser').param({ rate });
    X('audio').module('phaser').param({ rate });
    X('stream').module('phaser').param({ rate });
    X('noise').module('phaser').param({ rate });
  }, []);

  const onChangeResonanceCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const resonance = event.currentTarget.valueAsNumber;

    X('mixer').module('phaser').param({ resonance });
    X('oneshot').module('phaser').param({ resonance });
    X('audio').module('phaser').param({ resonance });
    X('stream').module('phaser').param({ resonance });
    X('noise').module('phaser').param({ resonance });
  }, []);

  const onChangeMixCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const mix = event.currentTarget.valueAsNumber;

    X('mixer').module('phaser').param({ mix });
    X('oneshot').module('phaser').param({ mix });
    X('audio').module('phaser').param({ mix });
    X('stream').module('phaser').param({ mix });
    X('noise').module('phaser').param({ mix });
  }, []);

  return (
    <div className='PhaserFieldset'>
      <fieldset>
        <legend>
          <Switch label='Phaser' checked={phaser} labelAsText={false} onChange={onChangeStateCallback} />
        </legend>
        <Select
          label='Select Phaser Stages'
          values={['0', '2', '4', '8', '12', '24']}
          texts={['all-pass filter', '2 stages', '4 stages', '8 stages', '12 stages', '24 stages']}
          disabled={false}
          onChange={onChangeStageCallback}
          defaultValue='12'
        />
        <Spacer space={8} />
        <ParameterController label='Frequency' autoupdate={false} defaultValue={350} min={350} max={8000} step={1} onChange={onChangeFrequencyCallback} />
        <Spacer space={8} />
        <ParameterController label='Depth' autoupdate={false} defaultValue={0} min={0} max={0.9} step={0.05} onChange={onChangeDepthCallback} />
        <Spacer space={8} />
        <ParameterController label='Rate' autoupdate={false} defaultValue={0} min={0} max={5} step={0.05} onChange={onChangeRateCallback} />
        <Spacer space={8} />
        <ParameterController label='Resonance' autoupdate={false} defaultValue={1} min={1} max={20} step={1} onChange={onChangeResonanceCallback} />
        <Spacer space={8} />
        <ParameterController label='Mix' autoupdate={false} defaultValue={0} min={0} max={1} step={0.05} onChange={onChangeMixCallback} />
        <Spacer space={8} />
      </fieldset>
    </div>
  );
};
