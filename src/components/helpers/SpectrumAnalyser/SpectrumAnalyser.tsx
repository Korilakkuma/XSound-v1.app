import React, { useMemo, useCallback } from 'react';

import { Canvas } from '/src/components/atoms/Canvas';
import { SVG } from '/src/components/atoms/SVG';

import { X } from 'xsound';

import type { VisualizerType } from '/src/types';
import type { FFTParams } from 'xsound';

export type Props = {
  loadedApp: boolean;
  type: VisualizerType;
};

export const SpectrumAnalyser: React.FC<Props> = (props: Props) => {
  const { loadedApp, type } = props;

  const fftParams: FFTParams = useMemo(() => {
    return {
      interval: -1,
      type: 'float',
      scale: 'logarithmic',
      styles: {
        shape: 'line',
        grid: 'rgba(255, 255, 255, 0.2)',
        font: {
          family: 'Arial',
          size: '12px',
          style: 'normal',
          weight: 'normal'
        },
        width: 1,
        right: 15,
        left: 40
      }
    };
  }, []);

  const setElementCallback = useCallback(
    (element: HTMLCanvasElement | SVGSVGElement) => {
      if (!loadedApp) {
        return;
      }

      X('mixer').module('analyser').domain('fft').setup(element).param(fftParams);
      X('oneshot').module('analyser').domain('fft').setup(element).param(fftParams);
      X('audio').module('analyser').domain('fft').setup(element).param(fftParams);
      X('stream').module('analyser').domain('fft').setup(element).param(fftParams);
      X('noise').module('analyser').domain('fft').setup(element).param(fftParams);
    },
    [loadedApp, fftParams]
  );

  return (
    <dl className='SpectrumAnalyser'>
      <dt>Frequency Domain</dt>
      <dd>
        {type === 'bitmap' && <Canvas width={420} height={120} hasHoverStyle={false} setElementCallback={setElementCallback} />}
        {type === 'vector' && <SVG width={420} height={120} hasHoverStyle={false} setElementCallback={setElementCallback} />}
      </dd>
    </dl>
  );
};
