import React, { useMemo, useCallback } from 'react';

import { Canvas } from '/src/components/atoms/Canvas';
import { SVG } from '/src/components/atoms/SVG';

import { X } from 'xsound';

import type { VisualizerType } from '/src/types';
import type { TimeParams } from 'xsound';

export type Props = {
  loadedApp: boolean;
  type: VisualizerType;
};

export const TimeAnalyser: React.FC<Props> = (props: Props) => {
  const { loadedApp, type } = props;

  const timeParams: TimeParams = useMemo(() => {
    return {
      interval: -1,
      type: 'uint',
      styles: {
        shape: 'line',
        grid: 'rgba(255, 255, 255, 0.2)',
        font: {
          family: 'Arial',
          size: '12px',
          style: 'normal',
          weight: 'normal'
        },
        width: 1.5,
        right: 15
      }
    };
  }, []);

  const setElementCallback = useCallback(
    (element: HTMLCanvasElement | SVGSVGElement) => {
      if (!loadedApp) {
        return;
      }

      X('mixer').module('analyser').domain('time').setup(element).param(timeParams);
      X('oneshot').module('analyser').domain('time').setup(element).param(timeParams);
      X('audio').module('analyser').domain('time').setup(element).param(timeParams);
      X('stream').module('analyser').domain('time').setup(element).param(timeParams);
      X('noise').module('analyser').domain('time').setup(element).param(timeParams);
    },
    [loadedApp, timeParams]
  );

  return (
    <dl className='TimeAnalyser'>
      <dt>Time Domain</dt>
      <dd>
        {type === 'bitmap' && <Canvas width={420} height={120} hasHoverStyle={false} setElementCallback={setElementCallback} />}
        {type === 'vector' && <SVG width={420} height={120} hasHoverStyle={false} setElementCallback={setElementCallback} />}
      </dd>
    </dl>
  );
};
