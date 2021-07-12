import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import { IState, XSoundSource, ConvertedTime } from '../../../types';
import { formatAudioTime } from '../../../utils';
import { Spacer } from '../../atoms/Spacer';
import { Switch } from '../../atoms/Switch';
import { ValueController } from '../../helpers/ValueController';
import { X } from 'xsound';

export interface Props {
  loadedApp: boolean;
  sources: XSoundSource[];
}

export const Analyser: React.FC<Props> = (props: Props) => {
  const { loadedApp, sources } = props;

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
      X('audio').module('analyser').domain('timeoverview', 0).param('mode', 'sprite');
      X('audio').module('analyser').domain('timeoverview', 1).param('mode', 'sprite');
      X('audio').param('loop', true);
    } else {
      const currentTime = X('audio').param('currentTime');
      const duration    = X('audio').param('duration');

      X('audio').module('analyser').domain('timeoverview', 0).param('mode', 'update');
      X('audio').module('analyser').domain('timeoverview', 1).param('mode', 'update');
      X('audio').param('loop', false);
      X('audio').stop().start(currentTime, duration);
    }

    setAnalyser(checked);
  }, []);

  const onChangeIntervalCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.valueAsNumber;

    sources.forEach((source: XSoundSource) => {
      X(source).module('analyser').domain('time').param('interval', ((value > 0) ? value : 'auto'));
      X(source).module('analyser').domain('fft').param('interval', ((value > 0) ? value : 'auto'));
    });
  }, [sources]);

  const onChangeSmoothingCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    sources.forEach((source: XSoundSource) => {
      X(source).module('analyser').param('smoothingTimeConstant', event.currentTarget.valueAsNumber);
    });
  }, [sources]);

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
      sources.forEach((source: XSoundSource) => {
        X(source).module('analyser').domain('time').state(active);
        X(source).module('analyser').domain('fft').state(active);
      });

      return;
    }

    sources.forEach((source: XSoundSource) => {
      X(source)
        .module('analyser')
        .param({
          fftSize              : 2048,
          minDecibels          : -100,
          maxDecibels          : -30,
          smoothingTimeConstant: 0.1
        });

      X(source)
        .module('analyser')
        .domain('time')
        .setup(canvasForTimeDomainRef.current)
        .param({
          interval: 0,
          shape   : 'line',
          wave    : 'rgba(0, 0, 255, 1.0)',
          grid    : 'rgba(255, 255, 255, 0.2)',
          font    : {
            family: 'Arial',
            size  : '12px',
            style : 'normal',
            weight: 'normal'
          },
          width   : 2,
          right   : 15,
          type    : 'uint'
        });

      X(source)
        .module('analyser')
        .domain('fft')
        .setup(canvasForFrequencyDomainRef.current)
        .param({
          interval: 0,
          shape   : 'rect',
          wave    : 'gradient',
          grid    : 'rgba(255, 255, 255, 0.2)',
          grad    : [
            { offset: 0, color: 'rgba(0, 128, 255, 1.0)' },
            { offset: 1, color: 'rgba(0,   0, 255, 1.0)' }
          ],
          font    : {
            family: 'Arial',
            size  : '12px',
            style : 'normal',
            weight: 'normal'
          },
          width   : 1,
          right   : 15,
          type    : 'uint',
          size    : 256
        });
    });

    const params = {
      shape: 'rect',
      wave : 'gradient',
      grad : [
        { offset: 0, color: 'rgba(0, 128, 255, 1.0)' },
        { offset: 1, color: 'rgba(0,   0, 255, 1.0)' }
      ],
      grid : 'rgba(255, 255, 255, 0.2)',
      currentTime: 'rgba(255, 255, 255, 0.1)',
      font : {
        family: 'Arial',
        size  : '12px',
        style : 'normal',
        weight: 'normal'
      },
      width: 0.5,
      right: 15
    };

    const dragCallback = (event: Event, startTime: number, endTime: number, mode: 'update' | 'sprite') => {
      if ((event.type === 'mousedown') || (event.type === 'touchstart')) {
        setShowDragTime(true);
        return;
      }

      if ((event.type === 'mousemove') || (event.type === 'touchmove')) {
        const convertedStartTime: ConvertedTime = X.convertTime(startTime);
        const convertedEndTime: ConvertedTime   = X.convertTime(endTime);

        setDragTime(`${formatAudioTime(convertedStartTime)} - ${formatAudioTime(convertedEndTime)}`);
        return;
      }

      if ((event.type === 'mouseup') || (event.type === 'touchend')) {
        switch (mode) {
          case 'update':
            if ((endTime >= 0) && (endTime <= X('audio').param('duration'))) {
              X('audio').param('currentTime', endTime);
              X('audio').module('analyser').domain('timeoverview', 0).update(endTime);
              X('audio').module('analyser').domain('timeoverview', 1).update(endTime);
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
      .state(true)
      .param(params)
      .drag(dragCallback);

    X('audio')
      .module('analyser')
      .domain('timeoverview', 1)
      .setup(canvasForTimeOverviewRightRef.current)
      .state(true)
      .param(params)
      .drag(dragCallback);

    setLoaded(true);
  }, [loadedApp, loaded, active, sources]);

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
              >
              </button>
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
          id="analyser-audio-sprite-mode"
          checked={analyser}
          tabIndex={active ? 0 : -1}
          onChange={onChangeModeCallback}
        />
        <Spacer direction="right" space={12} />
        <ValueController
          label="Interval"
          id="analyser-interval"
          defaultValue={0}
          min={0}
          max={1000}
          step={10}
          width="20%"
          tabIndex={active ? 0 : -1}
          onChange={onChangeIntervalCallback}
        />
        <Spacer direction="right" space={12} />
        <ValueController
          label="Smoothing"
          id="analyser-smoothing"
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
