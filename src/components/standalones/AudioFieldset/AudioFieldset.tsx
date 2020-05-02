import * as React from 'react';
import { Spacer } from '../../atoms/Spacer';
import { FileUploader } from '../../atoms/FileUploader';
import { Button } from '../../atoms/Button';
import { ValueController } from '../../helpers/ValueController';
import { X } from 'xsound';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {
}

interface State {
  filename: string;
  paused: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  pitch: number;
  depth: number;
}

export default class AudioFieldset extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      filename   : '',
      paused     : true,
      currentTime: 0,
      duration   : 0,
      volume     : 1,
      pitch      : 1,
      depth      : 0
    };

    this.onChangeFile = this.onChangeFile.bind(this);
    this.onDragEnter  = this.onDragEnter.bind(this);
    this.onDragOver   = this.onDragOver.bind(this);
    this.onDragLeave  = this.onDragLeave.bind(this);
    this.onDrop       = this.onDrop.bind(this);

    this.onClick = this.onClick.bind(this);

    this.onChangeCurrentTime = this.onChangeCurrentTime.bind(this);
    this.onChangeVolume      = this.onChangeVolume.bind(this);
    this.onChangePitch       = this.onChangePitch.bind(this);
    this.onChangeDepth       = this.onChangeDepth.bind(this);
  }

  // `X('audio').setup` is not invoked on `componentDidMount`
  componentDidUpdate(): void {
    const decodeCallback = () => {
      // TODO: Open Modal and Show Progress Bar
      console.log('Decoding ...');
    };

    const readyCallback = (buffer: AudioBuffer) => {
      this.setState({ duration: buffer.duration });
    };

    const startCallback = () => {
      // X('audio').module('recorder').start();
      // X('audio').module('session').start();
    };

    const stopCallback = () => {
      // TODO: do something ...
    };

    const updateCallback = (source: AudioBufferSourceNode, currentTime: number) => {
      const index = Math.floor(currentTime * source.buffer.sampleRate);
      const n100msec = 0.100 * source.buffer.sampleRate;

      if ((index % n100msec) !== 0) {
        return;
      }

      this.setState({ currentTime });
    };

    const endedCallback = () => {
      this.setState({ currentTime: 0 });

      // X('audio').module('analyser').domain('time-overview-L').update(0);
      // X('audio').module('analyser').domain('time-overview-R').update(0);
    };

    X('audio').setup({
      decode: decodeCallback,
      ready : readyCallback,
      start : startCallback,
      stop  : stopCallback,
      update: updateCallback,
      ended : endedCallback
    });
  }

  render(): React.ReactNode {
    const {
      filename,
      paused,
      currentTime,
      duration,
      volume,
      pitch,
      depth
    } = this.state;

    const convertedCurrenTime = X.convertTime(currentTime);
    const convertedDuration   = X.convertTime(duration);

    const currentTimeText = `${('0' + convertedCurrenTime.minutes).slice(-2)} : ${('0' + convertedCurrenTime.seconds).slice(-2)}`;
    const durationText    = `${('0' + convertedDuration.minutes).slice(-2)} : ${('0' + convertedDuration.seconds).slice(-2)}`;

    return (
      <div className="AudioFieldset">
        <fieldset>
          <legend>Audio</legend>
          <div className="AudioFieldset__selectAudio">
            <FileUploader
              label="Upload Audio"
              accept="audio/*"
              placeholder="Audio File (wav, ogg, mp3 ... etc)"
              filename={filename}
              onChange={this.onChangeFile}
              onDragEnter={this.onDragEnter}
              onDragOver={this.onDragOver}
              onDragLeave={this.onDragLeave}
              onDrop={this.onDrop}
            />
            <Button
              label={paused ? 'Start Audio' : 'Stop Audio'}
              image="/assets/images/button-audio.png"
              width={70}
              height={33}
              size="70px 99px"
              active={!paused}
              onClick={this.onClick}
            />
          </div>
          <ValueController
            label={`${currentTimeText} / ${durationText}`}
            id="audio-fieldset-current-time"
            defaultValue={Math.floor(currentTime)}
            min={0}
            max={duration > 0 ? duration : 0}
            step={1}
            onChange={this.onChangeCurrentTime}
          />
          <Spacer space={8} />
          <ValueController
            label="Volume"
            id="audio-fieldset-volume"
            defaultValue={volume}
            min={0}
            max={1}
            step={0.05}
            onChange={this.onChangeVolume}
          />
          <Spacer space={8} />
          <ValueController
            label="Pitch Shifter"
            id="audio-fieldset-pitch"
            defaultValue={pitch}
            min={0.05}
            max={4}
            step={0.05}
            onChange={this.onChangePitch}
          />
          <Spacer space={8} />
          <ValueController
            label="Volca Canceler"
            id="audio-fieldset-vocal-canceler"
            defaultValue={depth}
            min={0}
            max={1}
            step={0.05}
            onChange={this.onChangeDepth}
          />
        </fieldset>
      </div>
    );
  }

  private readFile(event: React.SyntheticEvent): void {
    const options = {
      event   : event.nativeEvent,
      type    : 'ArrayBuffer',
      success : (event, arrayBuffer) => {
        X('audio').ready(arrayBuffer);

        event.currentTarget.value = '';
      },
      error   : () => {
        // TODO: Open Modal that shows error message
      },
      progress: () => {
        // TODO: Open Modal and Show Progress Bar
        console.log('Progress ...');
      }
    };

    try {
      const file = X.file(options);

      this.setState({ filename: file.name });
    } catch (error: Error) {
      // TODO: Open Modal this shows error message
      console.log(error);
    }
  }

  private onChangeFile(event: React.SyntheticEvent): void {
    this.readFile(event);
  }

  private onDragEnter(event: React.SyntheticEvent): void {
    event.preventDefault();
  }

  private onDragOver(event: React.SyntheticEvent): void {
    event.preventDefault();
  }

  private onDragLeave(event: React.SyntheticEvent): void {
    event.preventDefault();
  }

  private onDrop(event: React.SyntheticEvent): void {
    this.readFile(event);
  }

  private onClick(): void {
    if (!X('audio').isBuffer()) {
      return;
    }

    if (X('audio').isPaused()) {
      X('audio').start(X('audio').param('currentTime'));

      this.setState({ paused: false });
    } else {
      X('audio').stop();

      this.setState({ paused: true });
    }
  }

  private onChangeCurrentTime(event: React.SyntheticEvent): void {
    X('audio').param('currentTime', event.currentTarget.valueAsNumber);
  }

  private onChangeVolume(event: React.SyntheticEvent): void {
    X('audio').param('mastervolume', event.currentTarget.valueAsNumber);
  }

  private onChangePitch(event: React.SyntheticEvent): void {
    X('audio').module('pitchshifter').param('pitch', event.currentTarget.valueAsNumber);
    X('stream').module('pitchshifter').param('pitch', event.currentTarget.valueAsNumber);
  }

  private onChangeDepth(event: React.SyntheticEvent): void {
    X('audio').module('vocalcanceler').param('depth', event.currentTarget.valueAsNumber);
  }
}
