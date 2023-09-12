import React, { useState, useMemo, useCallback } from 'react';

import { Canvas } from '/src/components/atoms/Canvas';
import { SVG } from '/src/components/atoms/SVG';

import { X } from 'xsound';

import { formatAudioTime } from '/src/utils';

import type { VisualizerType } from '/src/types';
import type { TimeOverviewParams, DragCallbackFunction, DragMode } from 'xsound';

type Channel = 'left' | 'right';

export type Props = {
  loadedApp: boolean;
  active: boolean;
  type: VisualizerType;
};

export const TimeOverviewer: React.FC<Props> = (props: Props) => {
  const { loadedApp, active, type } = props;

  const [dragTime, setDragTime] = useState<string>('00 : 00 - 00 : 00');
  const [showDragTime, setShowDragTime] = useState<boolean>(false);
  const [showTimeOverview, setShowTimeOverview] = useState<Channel>('left');

  const timeoverviewStyle: TimeOverviewParams = useMemo(() => {
    return {
      currentTime: {
        color: 'rgba(255, 255, 255, 0.1)'
      },
      styles: {
        shape: 'rect',
        grid: 'rgba(255, 255, 255, 0.2)',
        gradients: [
          { offset: 0, color: 'rgba(0, 128, 255, 1.0)' },
          { offset: 1, color: 'rgba(0,   0, 255, 1.0)' }
        ],
        font: {
          family: 'Arial',
          size: '12px',
          style: 'normal',
          weight: 'normal'
        },
        width: 0.5,
        right: 15
      }
    };
  }, []);

  const onClickChannelCallback = useCallback(() => {
    setShowTimeOverview(showTimeOverview === 'right' ? 'left' : 'right');
  }, [showTimeOverview]);

  const dragCallback: DragCallbackFunction = useCallback(
    (event: MouseEvent | TouchEvent, startTime: number, endTime: number, mode: DragMode, direction: boolean) => {
      if (event.type === 'mousedown' || event.type === 'touchstart') {
        setShowDragTime(true);
        return;
      }

      const time = direction ? endTime : startTime;

      if (event.type === 'mousemove' || event.type === 'touchmove') {
        const convertedStartTime = X.convertTime(startTime);
        const convertedEndTime = X.convertTime(endTime);

        setDragTime(`${formatAudioTime(convertedStartTime)} - ${formatAudioTime(convertedEndTime)}`);

        if (time >= 0 && time <= X('audio').param('duration')) {
          X('audio').param({ currentTime: time });
        }

        return;
      }

      if (event.type === 'mouseup' || event.type === 'touchend') {
        switch (mode) {
          case 'update':
            if (time >= 0 && time <= X('audio').param('duration')) {
              X('audio').module('analyser').domain('timeoverview', 0).update(time);
              X('audio').module('analyser').domain('timeoverview', 1).update(time);
              X('audio').param({ currentTime: time });
            }

            break;
          case 'sprite':
            X('audio').stop().start(startTime, endTime);

            break;
          default:
            break;
        }

        setShowDragTime(false);
      }
    },
    []
  );

  const setElementForLeftChannelCallback = useCallback(
    (element: HTMLCanvasElement | SVGSVGElement) => {
      if (!loadedApp) {
        return;
      }

      X('audio').module('analyser').domain('timeoverview', 0).setup(element).param(timeoverviewStyle).drag(dragCallback).activate();
    },
    [loadedApp, timeoverviewStyle, dragCallback]
  );

  const setElementForRightChannelCallback = useCallback(
    (element: HTMLCanvasElement | SVGSVGElement) => {
      if (!loadedApp) {
        return;
      }

      X('audio').module('analyser').domain('timeoverview', 1).setup(element).param(timeoverviewStyle).drag(dragCallback).activate();
    },
    [loadedApp, timeoverviewStyle, dragCallback]
  );

  return (
    <dl className='TimeOverviewer'>
      <dt>
        <label>
          <button
            type='button'
            className={`TimeOverviewer__channelSelector -${showTimeOverview}`}
            aria-label='Select Channel'
            tabIndex={active ? 0 : -1}
            onClick={onClickChannelCallback}
          />
          Time Overview [{showTimeOverview}]
        </label>
        {showDragTime ? <span className='Analyser__dragTime'>{dragTime}</span> : null}
      </dt>
      <dd hidden={showTimeOverview === 'right'}>
        {type === 'bitmap' && <Canvas width={1200} height={120} hasHoverStyle={true} setElementCallback={setElementForRightChannelCallback} />}
        {type === 'vector' && <SVG width={1200} height={120} hasHoverStyle={true} setElementCallback={setElementForRightChannelCallback} />}
      </dd>
      <dd hidden={showTimeOverview === 'left'}>
        {type === 'bitmap' && <Canvas width={1200} height={120} hasHoverStyle={true} setElementCallback={setElementForLeftChannelCallback} />}
        {type === 'vector' && <SVG width={1200} height={120} hasHoverStyle={true} setElementCallback={setElementForLeftChannelCallback} />}
      </dd>
    </dl>
  );
};
