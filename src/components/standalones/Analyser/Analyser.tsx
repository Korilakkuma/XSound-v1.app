import * as React from 'react';
import { RefObject } from 'react';
import { Spacer } from '../../atoms/Spacer';
import { Switch } from '../../atoms/Switch';
import { ValueController } from '../../helpers/ValueController';
import { X } from 'xsound';

interface Props {
  active: boolean;
  sources: string[];
}

interface State {
  active: boolean;
  showTimeOverview: 'left' | 'right';
}

interface DerivedState {
  active: boolean;
}

export default class Analyser extends React.Component<Props, State> {
  private setupped = false;

  private canvasForTimeOverviewLeftRef: RefObject<HTMLCanvasElement>  = React.createRef<HTMLCanvasElement>();
  private canvasForTimeOverviewRightRef: RefObject<HTMLCanvasElement> = React.createRef<HTMLCanvasElement>();
  private canvasForTimeDomainRef: RefObject<HTMLCanvasElement>        = React.createRef<HTMLCanvasElement>();
  private canvasForFrequencyDomainRef: RefObject<HTMLCanvasElement>   = React.createRef<HTMLCanvasElement>();

  static getDerivedStateFromProps(props: Props, state: State): DerivedState | null {
    if (props.active !== state.active) {
      return { active: props.active };
    }

    return null;
  }

  constructor(props: Props) {
    super(props);

    this.state = {
      active          : props.active,
      showTimeOverview: 'left'
    };

    this.onClickChannel = this.onClickChannel.bind(this);

    this.onChangeMode      = this.onChangeMode.bind(this);
    this.onChangeInterval  = this.onChangeInterval.bind(this);
    this.onChangeSmoothing = this.onChangeSmoothing.bind(this);
  }

  // `Analyser#setup` is not invoked on `componentDidMount`
  componentDidUpdate(): void {
    const { active } = this.state;

    if (this.setupped) {
      this.props.sources.forEach((source: string) => {
        X(source).module('analyser').domain('time').state(active);
        X(source).module('analyser').domain('fft').state(active);
      });

      return;
    }

    this.props.sources.forEach((source: string) => {
      X(source).module('analyser').param({
        fftSize              : 2048,
        minDecibels          : -100,
        maxDecibels          : -30,
        smoothingTimeConstant: 0.1
      });

      X(source).module('analyser').domain('time').setup(this.canvasForTimeDomainRef.current).param({
        interval: 0,
        shape   : 'line',
        wave    : 'rgba(0, 0, 255, 1.0)',
        font    : {
          family: 'Arial',
          size  : '12px',
          style : 'normal',
          weight: 'normal'
        },
        width   : 2,
        right   : 15,
        type    : 'uint'
      }).state(active);

      X(source).module('analyser').domain('fft').setup(this.canvasForFrequencyDomainRef.current).param({
        interval: 0,
        shape   : 'rect',
        wave    : 'gradient',
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
      }).state(active);
    });

    const params = {
      shape: 'rect',
      wave : 'gradient',
      grad : [
        { offset: 0, color: 'rgba(0, 128, 255, 1.0)' },
        { offset: 1, color: 'rgba(0,   0, 255, 1.0)' }
      ],
      font : {
        family: 'Arial',
        size  : '12px',
        style : 'normal',
        weight: 'normal'
      },
      width: 0.5,
      right: 15
    };

    const dragCallback = (event: Event, startTime: number, endTime: number) => {
      if (!((event.type === 'mouseup') || (event.type === 'touchend'))) {
        return;
      }

      const mode = X('audio').module('analyser').domain('timeoverview', 0).param('mode');

      switch (mode) {
        case 'update':
          if ((startTime >= 0) && (startTime <= X('audio').param('duration'))) {
            X('audio').param('currentTime', startTime);
            X('audio').module('analyser').domain('timeoverview', 0).update(startTime);
            X('audio').module('analyser').domain('timeoverview', 1).update(startTime);
          }

          break;
        case 'sprite':
          X('audio').stop().start(startTime, endTime);

          break;
        default:
          break;
      }
    };

    X('audio')
      .module('analyser')
      .domain('timeoverview', 0)
      .setup(this.canvasForTimeOverviewLeftRef.current)
      .state(true)
      .param(params)
      .drag(dragCallback);

    X('audio')
      .module('analyser')
      .domain('timeoverview', 1)
      .setup(this.canvasForTimeOverviewRightRef.current)
      .state(true)
      .param(params)
      .drag(dragCallback);

    this.setupped = true;
  }

  render(): React.ReactNode {
    const { active, showTimeOverview } = this.state;

    return (
      <div className={`Analyser${active ? ' -active' : ''}`}>
        <div className="Analyser__canvas">
          <dl>
            <dt>
              <label>
                <button
                  type="button"
                  className={`Analyser__channelSelector -${showTimeOverview}`}
                  aria-label="Select Channel"
                  onClick={this.onClickChannel}
                >
                </button>
                Time Overview [{showTimeOverview}]
              </label>
            </dt>
            <dd hidden={showTimeOverview === 'right'}><canvas ref={this.canvasForTimeOverviewLeftRef} width="1200" height="120" /></dd>
            <dd hidden={showTimeOverview ===  'left'}><canvas ref={this.canvasForTimeOverviewRightRef} width="1200" height="120" /></dd>
          </dl>
          <dl>
            <dt>Time Domain</dt>
            <dd><canvas ref={this.canvasForTimeDomainRef} width="360" height="120" /></dd>
          </dl>
          <dl>
            <dt>Frequency Domain</dt>
            <dd><canvas ref={this.canvasForFrequencyDomainRef} width="360" height="120" /></dd>
          </dl>
        </div>
        <div className="Analyser__controllers">
          <Switch
            label="Audio Sprite"
            id="analyser-audio-sprite-mode"
            defaultChecked={false}
            onChange={this.onChangeMode}
          />
          <Spacer direction="Right" space={12} />
          <ValueController
            label="Interval"
            id="analyser-interval"
            defaultValue={0}
            min={0}
            max={1000}
            step={10}
            width="20%"
            onChange={this.onChangeInterval}
          />
          <Spacer direction="Right" space={12} />
          <ValueController
            label="Smoothing"
            id="analyser-smoothing"
            defaultValue={0.8}
            min={0}
            max={1}
            step={0.05}
            width="20%"
            onChange={this.onChangeSmoothing}
          />
        </div>
      </div>
    );
  }

  private onClickChannel(): void {
    this.setState((prevState: State) => {
      return { showTimeOverview: prevState.showTimeOverview === 'right' ? 'left' : 'right' };
    });
  }

  private onChangeMode(event: React.SyntheticEvent): void {
    const checked = (event.currentTarget as HTMLInputElement).checked;

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
  }

  private onChangeInterval(event: React.SyntheticEvent): void {
    const value = (event.currentTarget as HTMLInputElement).valueAsNumber;

    this.props.sources.forEach((source: string) => {
      X(source).module('analyser').domain('time').param('interval', ((value > 0) ? value : 'auto'));
      X(source).module('analyser').domain('fft').param('interval', ((value > 0) ? value : 'auto'));
    });
  }

  private onChangeSmoothing(event: React.SyntheticEvent): void {
    this.props.sources.forEach((source: string) => {
      X(source).module('analyser').param('smoothingTimeConstant', (event.currentTarget as HTMLInputElement).valueAsNumber);
    });
  }
}
