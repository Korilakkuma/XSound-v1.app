import React, { useCallback, useState } from 'react';
import { X } from 'xsound';

import { Spacer } from '/src/components/atoms/Spacer';
import { Switch } from '/src/components/atoms/Switch';
import { ParameterController } from '/src/components/helpers/ParameterController';

export const CompressorFieldset: React.FC = () => {
  const [compressor, setCompressor] = useState<boolean>(true);

  const onChangeStateCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.currentTarget.checked;

    if (checked) {
      X('mixer').module('compressor').activate();
      X('oneshot').module('compressor').activate();
      X('audio').module('compressor').activate();
      X('stream').module('compressor').activate();
      X('noise').module('compressor').activate();
    } else {
      X('mixer').module('compressor').deactivate();
      X('oneshot').module('compressor').deactivate();
      X('audio').module('compressor').deactivate();
      X('stream').module('compressor').deactivate();
      X('noise').module('compressor').deactivate();
    }

    setCompressor(checked);
  }, []);

  const onChangeThresholdCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const threshold = event.currentTarget.valueAsNumber;

    X('mixer').module('compressor').param({ threshold });
    X('oneshot').module('compressor').param({ threshold });
    X('audio').module('compressor').param({ threshold });
    X('stream').module('compressor').param({ threshold });
    X('noise').module('compressor').param({ threshold });
  }, []);

  const onChangeKneeCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const knee = event.currentTarget.valueAsNumber;

    X('mixer').module('compressor').param({ knee });
    X('oneshot').module('compressor').param({ knee });
    X('audio').module('compressor').param({ knee });
    X('stream').module('compressor').param({ knee });
    X('noise').module('compressor').param({ knee });
  }, []);

  const onChangeRatioCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const ratio = event.currentTarget.valueAsNumber;

    X('mixer').module('compressor').param({ ratio });
    X('oneshot').module('compressor').param({ ratio });
    X('audio').module('compressor').param({ ratio });
    X('stream').module('compressor').param({ ratio });
    X('noise').module('compressor').param({ ratio });
  }, []);

  const onChangeAttackCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const attack = event.currentTarget.valueAsNumber;

    X('mixer').module('compressor').param({ attack });
    X('oneshot').module('compressor').param({ attack });
    X('audio').module('compressor').param({ attack });
    X('stream').module('compressor').param({ attack });
    X('noise').module('compressor').param({ attack });
  }, []);

  const onChangeReleaseCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const release = event.currentTarget.valueAsNumber;

    X('mixer').module('compressor').param({ release });
    X('oneshot').module('compressor').param({ release });
    X('audio').module('compressor').param({ release });
    X('stream').module('compressor').param({ release });
    X('noise').module('compressor').param({ release });
  }, []);

  return (
    <div className='CompressorFieldset'>
      <fieldset>
        <legend>
          <Switch label='Compressor' checked={compressor} labelAsText={false} onChange={onChangeStateCallback} />
        </legend>
        <ParameterController label='Threshold' autoupdate={false} defaultValue={-24} min={-100} max={0} step={1} onChange={onChangeThresholdCallback} />
        <Spacer space={8} />
        <ParameterController label='Knee' autoupdate={false} defaultValue={30} min={0} max={40} step={1} onChange={onChangeKneeCallback} />
        <Spacer space={8} />
        <ParameterController label='Ratio' autoupdate={false} defaultValue={12} min={1} max={20} step={1} onChange={onChangeRatioCallback} />
        <Spacer space={8} />
        <ParameterController label='Attack' autoupdate={false} defaultValue={0.003} min={0} max={1} step={0.001} onChange={onChangeAttackCallback} />
        <Spacer space={8} />
        <ParameterController label='Release' autoupdate={false} defaultValue={0.25} min={0.01} max={1} step={0.01} onChange={onChangeReleaseCallback} />
        <Spacer space={8} />
      </fieldset>
    </div>
  );
};
