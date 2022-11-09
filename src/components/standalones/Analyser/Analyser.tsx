import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import { IState } from '../../../types';
import { formatAudioTime } from '../../../utils';
import { Spacer } from '../../atoms/Spacer';
import { Switch } from '../../atoms/Switch';
import { ParameterController } from '../../helpers/ParameterController';
import { X, AnalyserParams, TimeOverviewParams, TimeParams, FFTParams, DragMode, DragCallbackFunction } from 'xsound';

export type Props = {
  loadedApp: boolean
};

export const Analyser: React.FC<Props> = (props: Props) => {
  const { loadedApp } = props;

  const canvasForTimeOverviewLeftRef  = useRef<HTMLCanvasElement>(null);
  const canvasForTimeOverviewRightRef = useRef<HTMLCanvasElement>(null);
  const canvasForTimeDomainRef        = useRef<HTMLCanvasElement>(null);
  const canvasForFrequencyDomainRef   = useRef<HTMLCanvasElement>(null);

  const [loaded, setLoaded] = useState<boolean>(false);
  const [analyser, setAnalyser] = useState<boolean>(false);
  const [dragTime, setDragTime] = useState<string>('00 : 00 - 00 : 00');
  const [showDragTime, setShowDragTime] = useState<boolean>(false);
  const [showTimeOverview, setShowTimeOverview] = useState<'left' | 'right'>('left');

  const active = useSelector((state: IState) => state.analyserState);

  const onClickChannelCallback = useCallback(() => {
    setShowTimeOverview(showTimeOverview === 'right' ? 'left' : 'right');
  }, [showTimeOverview]);

  const onChangeModeCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.currentTarget.checked;

    if (checked) {
      X('audio').module('analyser').domain('timeoverview', 0).param({ mode: 'sprite' });
      X('audio').module('analyser').domain('timeoverview', 1).param({ mode: 'sprite' });
      X('audio').param({ loop: true });
    } else {
      const currentTime = X('audio').param('currentTime');
      const duration    = X('audio').param('duration');

      X('audio').module('analyser').domain('timeoverview', 0).param({ mode: 'update' });
      X('audio').module('analyser').domain('timeoverview', 1).param({ mode: 'update' });
      X('audio').param({ loop: false });
      X('audio').stop().start(currentTime, duration);
    }

    setAnalyser(checked);
  }, []);

  const onChangeIntervalCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.valueAsNumber;

    X('mixer').module('analyser').domain('time').param({ interval: (value > 0) ? value : -1 });
    X('mixer').module('analyser').domain('fft').param({ interval: (value > 0) ? value : -1 });
    X('oneshot').module('analyser').domain('time').param({ interval: (value > 0) ? value : -1 });
    X('oneshot').module('analyser').domain('fft').param({ interval: (value > 0) ? value : -1 });
    X('audio').module('analyser').domain('time').param({ interval: (value > 0) ? value : -1 });
    X('audio').module('analyser').domain('fft').param({ interval: (value > 0) ? value : -1 });
    X('stream').module('analyser').domain('time').param({ interval: (value > 0) ? value : -1 });
    X('stream').module('analyser').domain('fft').param({ interval: (value > 0) ? value : -1 });
    X('noise').module('analyser').domain('time').param({ interval: (value > 0) ? value : -1 });
    X('noise').module('analyser').domain('fft').param({ interval: (value > 0) ? value : -1 });
  }, []);

  const onChangeSmoothingCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const smoothingTimeConstant = event.currentTarget.valueAsNumber;

    X('mixer').module('analyser').param({ smoothingTimeConstant });
    X('oneshot').module('analyser').param({ smoothingTimeConstant });
    X('audio').module('analyser').param({ smoothingTimeConstant });
    X('stream').module('analyser').param({ smoothingTimeConstant });
    X('noise').module('analyser').param({ smoothingTimeConstant });
  }, []);

  useEffect(() => {
    if (!loadedApp) {
      return;
    }

    if (canvasForTimeOverviewLeftRef.current === null ||
      canvasForTimeOverviewRightRef.current === null ||
      canvasForTimeDomainRef.current === null ||
      canvasForFrequencyDomainRef.current === null) {
      return;
    }

    if (loaded) {
      X('mixer').module('analyser').domain('time').activate();
      X('mixer').module('analyser').domain('fft').activate();
      X('oneshot').module('analyser').domain('time').activate();
      X('oneshot').module('analyser').domain('fft').activate();
      X('audio').module('analyser').domain('time').activate();
      X('audio').module('analyser').domain('fft').activate();
      X('stream').module('analyser').domain('time').activate();
      X('stream').module('analyser').domain('fft').activate();
      X('noise').module('analyser').domain('time').activate();
      X('noise').module('analyser').domain('fft').activate();

      return;
    }

    const analyserParams: AnalyserParams = {
      fftSize              : 2048,
      minDecibels          : -60,
      maxDecibels          : 0,
      smoothingTimeConstant: 0.8
    };

    const timeParams: TimeParams = {
      interval: -1,
      type    : 'uint',
      styles  : {
        shape    : 'line',
        grid     : 'rgba(255, 255, 255, 0.2)',
        font     : {
          family: 'Arial',
          size  : '12px',
          style : 'normal',
          weight: 'normal'
        },
        width : 1.5,
        right : 15
      }
    };

    const fftParams: FFTParams = {
      interval: -1,
      type    : 'float',
      styles  : {
        shape : 'line',
        grid  : 'rgba(255, 255, 255, 0.2)',
        font  : {
          family: 'Arial',
          size  : '12px',
          style : 'normal',
          weight: 'normal'
        },
        width : 1,
        right : 15,
        left  : 40
      }
    };

    const timeoverviewStyle: TimeOverviewParams = {
      currentTime: {
        color: 'rgba(255, 255, 255, 0.1)'
      },
      styles     : {
        shape      : 'rect',
        grid       : 'rgba(255, 255, 255, 0.2)',
        gradients  : [
          { offset: 0, color: 'rgba(0, 128, 255, 1.0)' },
          { offset: 1, color: 'rgba(0,   0, 255, 1.0)' }
        ],
        font       : {
          family: 'Arial',
          size  : '12px',
          style : 'normal',
          weight: 'normal'
        },
        width    : 0.5,
        right    : 15
      }
    };

    X('mixer').module('analyser').param(analyserParams);
    X('oneshot').module('analyser').param(analyserParams);
    X('audio').module('analyser').param(analyserParams);
    X('stream').module('analyser').param(analyserParams);
    X('noise').module('analyser').param(analyserParams);

    X('mixer').module('analyser').domain('time').setup(canvasForTimeDomainRef.current).param(timeParams);
    X('oneshot').module('analyser').domain('time').setup(canvasForTimeDomainRef.current).param(timeParams);
    X('audio').module('analyser').domain('time').setup(canvasForTimeDomainRef.current).param(timeParams);
    X('stream').module('analyser').domain('time').setup(canvasForTimeDomainRef.current).param(timeParams);
    X('noise').module('analyser').domain('time').setup(canvasForTimeDomainRef.current).param(timeParams);

    X('mixer').module('analyser').domain('fft').setup(canvasForFrequencyDomainRef.current).param(fftParams);
    X('oneshot').module('analyser').domain('fft').setup(canvasForFrequencyDomainRef.current).param(fftParams);
    X('audio').module('analyser').domain('fft').setup(canvasForFrequencyDomainRef.current).param(fftParams);
    X('stream').module('analyser').domain('fft').setup(canvasForFrequencyDomainRef.current).param(fftParams);
    X('noise').module('analyser').domain('fft').setup(canvasForFrequencyDomainRef.current).param(fftParams);

    const dragCallback: DragCallbackFunction = (event: MouseEvent | TouchEvent, startTime: number, endTime: number, mode: DragMode, direction: boolean) => {
      if ((event.type === 'mousedown') || (event.type === 'touchstart')) {
        setShowDragTime(true);
        return;
      }

      if ((event.type === 'mousemove') || (event.type === 'touchmove')) {
        const convertedStartTime = X.convertTime(startTime);
        const convertedEndTime = X.convertTime(endTime);

        setDragTime(`${formatAudioTime(convertedStartTime)} - ${formatAudioTime(convertedEndTime)}`);
        return;
      }

      if ((event.type === 'mouseup') || (event.type === 'touchend')) {
        const time = direction ? endTime : startTime;

        switch (mode) {
          case 'update':
            if ((time >= 0) && (time <= X('audio').param('duration'))) {
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
    };

    X('audio')
      .module('analyser')
      .domain('timeoverview', 0)
      .setup(canvasForTimeOverviewLeftRef.current)
      .param(timeoverviewStyle)
      .drag(dragCallback)
      .activate();

    X('audio')
      .module('analyser')
      .domain('timeoverview', 1)
      .setup(canvasForTimeOverviewRightRef.current)
      .param(timeoverviewStyle)
      .drag(dragCallback)
      .activate();

    setLoaded(true);
  }, [loadedApp, loaded, active]);

  return (
    <div id="analyser-fieldset" aria-hidden={!active} className={`Analyser${active ? ' -active' : ''}`}>
      <div className="Analyser__canvas">
        <dl>
          <dt>
            <label>
              <button
                type="button"
                className={`Analyser__channelSelector -${showTimeOverview}`}
                aria-label="Select Channel"
                tabIndex={active ? 0 : -1}
                onClick={onClickChannelCallback}
              />
              Time Overview [{showTimeOverview}]
            </label>
            {showDragTime ? <span className="Analyser__dragTime">{dragTime}</span> : null}
          </dt>
          <dd hidden={showTimeOverview === 'right'}><canvas ref={canvasForTimeOverviewLeftRef} width="1200" height="120" /></dd>
          <dd hidden={showTimeOverview ===  'left'}><canvas ref={canvasForTimeOverviewRightRef} width="1200" height="120" /></dd>
        </dl>
        <dl>
          <dt>Time Domain</dt>
          <dd><canvas ref={canvasForTimeDomainRef} width="420" height="120" /></dd>
        </dl>
        <dl>
          <dt>Frequency Domain</dt>
          <dd><canvas ref={canvasForFrequencyDomainRef} width="420" height="120" /></dd>
        </dl>
      </div>
      <div className="Analyser__controllers">
        <Switch
          label="Audio Sprite"
          checked={analyser}
          labelAsText={true}
          tabIndex={active ? 0 : -1}
          onChange={onChangeModeCallback}
        />
        <Spacer direction="right" space={12} />
        <ParameterController
          label="Interval"
          autoupdate={false}
          defaultValue={0}
          min={0}
          max={1000}
          step={10}
          width="20%"
          tabIndex={active ? 0 : -1}
          onChange={onChangeIntervalCallback}
        />
        <Spacer direction="right" space={12} />
        <ParameterController
          label="Smoothing"
          autoupdate={false}
          defaultValue={0.8}
          min={0}
          max={1}
          step={0.05}
          width="20%"
          tabIndex={active ? 0 : -1}
          onChange={onChangeSmoothingCallback}
        />
      </div>
    </div>
  );
};
