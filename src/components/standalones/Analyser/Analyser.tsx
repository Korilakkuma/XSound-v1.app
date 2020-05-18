import * as React from 'react';
import { Spacer } from '../../atoms/Spacer';
import { Switch } from '../../atoms/Switch';
import { ValueController } from '../../helpers/ValueController';
import { X } from 'xsound';

interface Props {
  sources: string[];
}

interface State {
  showTimeOverview: 'left' | 'right';
}

export default class Analyser extends React.Component<Props, State> {
  private canvasForTimeOverviewLRef: RefObject<HTMLCanvasElement>   = React.createRef<HTMLCanvasElement>();
  private canvasForTimeOverviewRRef: RefObject<HTMLCanvasElement>   = React.createRef<HTMLCanvasElement>();
  private canvasForTimeDomainRef: RefObject<HTMLCanvasElement>      = React.createRef<HTMLCanvasElement>();
  private canvasForFrequencyDomainRef: RefObject<HTMLCanvasElement> = React.createRef<HTMLCanvasElement>();

  constructor(props: Props) {
    super(props);

    this.state = {
      showTimeOverview: 'left'
    };

    this.onClickChannel = this.onClickChannel.bind(this);

    this.onChangeMode      = this.onChangeMode.bind(this);
    this.onChangeInterval  = this.onChangeInterval.bind(this);
    this.onChangeSmoothing = this.onChangeSmoothing.bind(this);
  }

  onChangeMode(event: React.SyntheticEvent): void {
    const checked = event.currentTarget.checked;

    if (checked) {
      X('audio').module('analyser').domain('time-overview-L').param('mode', 'sprite');
      X('audio').module('analyser').domain('time-overview-R').param('mode', 'sprite');
      X('audio').param('loop', true);
    } else {
      X('audio').module('analyser').domain('time-overview-L').param('mode', 'update');
      X('audio').module('analyser').domain('time-overview-R').param('mode', 'update');
      X('audio').param('loop', false);
    }
  }

  onChangeInterval(event: React.SyntheticEvent): void {
    const value = event.currentTarget.valueAsNumber;

    this.props.sources.forEach((source: string) => {
      X(source).module('analyser').domain('time').param('interval', ((value > 0) ? value : 'auto'));
      X(source).module('analyser').domain('fft').param('interval', ((value > 0) ? value : 'auto'));
    });
  }

  onChangeSmoothing(event: React.SyntheticEvent): void {
    this.props.sources.forEach((source: string) => {
      X(source).module('analyser').param('smoothingTimeConstant', event.currentTarget.valueAsNumber);
    });
  }

  // `Analyser#setup` is not invoked on `componentDidMount`
  componentDidUpdate(): void {
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
      }).state(true);

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
      }).state(true);
    });

    X('audio')
      .module('analyser')
      .domain('time-overview-L')
      .setup(this.canvasForTimeOverviewLRef.current)
      .state(true)
      .param({
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
      });

    X('audio')
      .module('analyser')
      .domain('time-overview-R')
      .setup(this.canvasForTimeOverviewRRef.current)
      .state(true)
      .param({
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
      });
  }

  render(): React.ReactNode {
    const { showTimeOverview } = this.state;

    return (
      <div className="Analyser">
        <div className="Analyser__canvas">
          <dl>
            <dt>
              <button
                type="button"
                className={`Analyser__channelSelector -${showTimeOverview}`}
                aria-label="Select Channel"
                onClick={this.onClickChannel}
              >
              </button>
              Time Overview [{showTimeOverview}]
            </dt>
            <dd hidden={showTimeOverview === 'right'}><canvas ref={this.canvasForTimeOverviewLRef} width="1200" height="120" /></dd>
            <dd hidden={showTimeOverview ===  'left'}><canvas ref={this.canvasForTimeOverviewRRef} width="1200" height="120" /></dd>
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
            label="Visual Audio Sprite"
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

  private onClickChannel(event: React.SyntheticEvent): void {
    this.setState({ showTimeOverview: this.state.showTimeOverview === 'right' ? 'left' : 'right' });
  }
}
