import * as React from 'react';
import { Spacer } from '../../atoms/Spacer';
import { Select } from '../../atoms/Select';
import { ValueController } from '../../helpers/ValueController';
import { X } from 'xsound';

interface Props {
  sources: string[];
}

interface State {
  objectURL: string;
  running: boolean;
  creating: boolean;
}

const NUMBER_OF_TRACKS = 4;

const CHANNEL = 2;   // Stereo
const BIT     = 16;  // 16 bit
const TYPE    = 'objectURL';

function createFilename() {
  const format = (n: number) => {
    return (`0${n}`).slice(-2);
  };

  const date = new Date();

  const y = date.getFullYear();
  const m = format(date.getMonth() + 1);
  const d = format(date.getDate());
  const h = format(date.getHours());
  const i = format(date.getMinutes());
  const s = format(date.getSeconds());

  return `record-${y}${m}${d}${h}${i}${s}.wav`;
}

export default class RecorderFieldset extends React.Component<Props, State> {
  private activeTrack = -1;

  constructor(props: Props) {
    super(props);

    this.state = {
      objectURL: '',
      running  : false,
      creating : false
    };

    this.onClickRecordButton   = this.onClickRecordButton.bind(this);
    this.onClickCreateButton   = this.onClickCreateButton.bind(this);
    this.onClickDownloadButton = this.onClickDownloadButton.bind(this);
    this.onClickClearButton    = this.onClickClearButton.bind(this);

    this.onChangeTrack = this.onChangeTrack.bind(this);

    this.onChangeLeftChannelGain  = this.onChangeLeftChannelGain.bind(this);
    this.onChangeRightChannelGain = this.onChangeRightChannelGain.bind(this);
  }

  // `Recorder#setup` is not invoked on `componentDidMount`
  componentDidUpdate(): void {
    if (this.activeTrack >= 0) {
      return;
    }

    this.props.sources.forEach((source: string) => {
      if (source !== 'oscillator') {
        X(source).module('recorder').setup(NUMBER_OF_TRACKS);
      }
    });

    this.activeTrack = 0;
  }

  render(): React.ReactNode {
    const { objectURL, running, creating } = this.state;

    return (
      <div className="RecorderFieldset">
        <fieldset>
          <legend>Recorder</legend>
          <div className="RecorderFieldset__buttons">
            <button
              type="button"
              className={`RecorderFieldset__controller${running ? ' -active' : ''}`}
              aria-label={running ? 'Stop Recording' : 'Start Recording'}
              onClick={this.onClickRecordButton}
            >
            </button>
            <button
              type="button"
              className={`RecorderFieldset__creator${creating ? ' -active' : ''}`}
              aria-label={creating ? 'Now creating WAVE file' : 'Create WAVE file'}
              onClick={this.onClickCreateButton}
            >
            </button>
            <a
              href={objectURL}
              download={objectURL ? createFilename() : null}
              className="RecorderFieldset__download"
              aria-label="Download"
              onClick={this.onClickDownloadButton}
            >
            </a>
            <button
              type="button"
              className="RecorderFieldset__clear"
              aria-label="Clear Track"
              onClick={this.onClickClearButton}
            >
            </button>
          </div>
          <Spacer space={16} />
          <Select
            values={['0', '1', '2', '3']}
            texts={['Track 1', 'Track 2', 'Track 3', 'Track 4']}
            onChange={this.onChangeTrack}
          />
          <Spacer space={16} />
          <ValueController
            label="Left Channel"
            id="recorder-fieldset-left-channel-gain"
            defaultValue={1}
            min={0}
            max={1}
            step={0.05}
            onChange={this.onChangeLeftChannelGain}
          />
          <Spacer space={8} />
          <ValueController
            label="Right Channel"
            id="recorder-fieldset-right-channel-gain"
            defaultValue={1}
            min={0}
            max={1}
            step={0.05}
            onChange={this.onChangeRightChannelGain}
          />
        </fieldset>
      </div>
    );
  }

  private onClickRecordButton(): void {
    if (this.state.running) {
      this.props.sources.forEach((source: string) => {
        if (source !== 'oscillator') {
          X(source).module('recorder').stop();
        }
      });

      this.setState({ running: false });
    } else {
      this.props.sources.forEach((source: string) => {
        if (source !== 'oscillator') {
          X(source).module('recorder').ready(this.activeTrack);

          if (source === 'stream') {
            X('stream').module('recorder').start();
          }
        }
      });

      this.setState({ running: true });
    }
  }

  private onClickCreateButton(event: React.SyntheticEvent): void {
    this.setState({ running: false });

    for (const source of this.props.sources) {
      if (source === 'oscillator') {
        continue;
      }

      this.setState({ creating: true });

      const url = X(source).module('recorder').create('all', CHANNEL, BIT, TYPE);

      if (url) {
        const audio = new Audio(url);

        audio.controls = false;
        audio.play();

        this.setState({
          objectURL: url,
          creating : false
        });

        return;
      }
    }

    this.setState({ creating: false });
  }

  private onClickDownloadButton(event: React.SyntheticEvent): void {
    const { objectURL, running } = this.state;

    if (!objectURL || running) {
      // In the case of recording
      event.preventDefault();
    }
  }

  private onClickClearButton(): void {
    if (this.state.running) {
      // In the case of recording
      return;
    }

    this.props.sources.forEach((source: string) => {
      if (source !== 'oscillator') {
        X(source).module('recorder').clear(this.activeTrack);
      }
    });
  }

  private onChangeTrack(event: React.SyntheticEvent): void {
    if (this.state.running) {
      // In the case of recording
      return;
    }

    this.activeTrack = parseInt(event.currentTarget.value, 10);

    this.props.sources.forEach((source: string) => {
      if (source !== 'oscillator') {
        X(source).module('recorder').ready(this.activeTrack);

        if (source === 'stream') {
          X('stream').module('recorder').start();
        }
      }
    });
  }

  private onChangeLeftChannelGain(event: React.SyntheticEvent): void {
    this.props.sources.forEach((source: string) => {
      if (source !== 'oscillator') {
        X(source).module('recorder').param('gainL', event.currentTarget.valueAsNumber);
      }
    });
  }

  private onChangeRightChannelGain(event: React.SyntheticEvent): void {
    this.props.sources.forEach((source: string) => {
      if (source !== 'oscillator') {
        X(source).module('recorder').param('gainR', event.currentTarget.valueAsNumber);
      }
    });
  }
}