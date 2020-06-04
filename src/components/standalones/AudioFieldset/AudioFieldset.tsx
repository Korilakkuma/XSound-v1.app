import * as React from 'react';
import { Spacer } from '../../atoms/Spacer';
import { FileUploader } from '../../atoms/FileUploader';
import { Button } from '../../atoms/Button';
import { ProgressBar } from '../../atoms/ProgressBar';
import { Modal } from '../../atoms/Modal';
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
  progress: boolean;
  loaded: number;
  total: number;
  rate: number;
  errorMessage: string;
  isShowModalForFileUploadError: boolean;
  isShowModalForDecodingError: boolean;
  isShowModalForProgress: boolean;
  isShowModalForDecoding: boolean;
}

export default class AudioFieldset extends React.Component<Props, State> {
  private setupped = false;

  constructor(props: Props) {
    super(props);

    this.state = {
      filename                     : '',
      paused                       : true,
      currentTime                  : 0,
      duration                     : 0,
      progress                     : false,
      loaded                       : 0,
      total                        : 0,
      rate                         : 0,
      errorMessage                 : '',
      isShowModalForFileUploadError: false,
      isShowModalForDecodingError  : false,
      isShowModalForProgress       : false,
      isShowModalForDecoding       : false
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

    this.onClose = this.onClose.bind(this);
  }

  // `X('audio').setup` is not invoked on `componentDidMount`
  componentDidUpdate(): void {
    if (this.setupped) {
      return;
    }

    const decodeCallback = () => {
      this.setState({
        progress              : false,
        loaded                : 0,
        total                 : 0,
        rate                  : 0,
        isShowModalForProgress: false,
        isShowModalForDecoding: true
      });
    };

    const readyCallback = (buffer: AudioBuffer) => {
      this.setState({
        duration              : buffer.duration,
        isShowModalForDecoding: false
      });
    };

    const startCallback = () => {
      X('audio').module('recorder').start();
      X('audio').module('session').start();
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
      this.setState({
        paused     : true,
        currentTime: 0
      });

      // X('audio').module('analyser').domain('time-overview-L').update(0);
      // X('audio').module('analyser').domain('time-overview-R').update(0);
    };

    const errorCallback = (error: Error) => {
      this.setState({
        errorMessage               : error.message,
        isShowModalForDecodingError: true
      });
    };

    X('audio').setup({
      decode: decodeCallback,
      ready : readyCallback,
      start : startCallback,
      stop  : stopCallback,
      update: updateCallback,
      ended : endedCallback,
      error : errorCallback
    });

    this.setupped = true;
  }

  render(): React.ReactNode {
    const {
      filename,
      paused,
      currentTime,
      duration,
      progress,
      loaded,
      // total,
      rate,
      errorMessage,
      isShowModalForFileUploadError,
      isShowModalForDecodingError,
      isShowModalForProgress,
      isShowModalForDecoding
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
          {/*
          <ValueController
            label="Volume"
            id="audio-fieldset-volume"
            defaultValue={1}
            min={0}
            max={1}
            step={0.05}
            onChange={this.onChangeVolume}
          />
          */}
          <Spacer space={8} />
          <ValueController
            label="Pitch Shifter"
            id="audio-fieldset-pitch"
            defaultValue={1}
            min={0.05}
            max={4}
            step={0.05}
            onChange={this.onChangePitch}
          />
          <Spacer space={8} />
          <ValueController
            label="Vocal Canceler"
            id="audio-fieldset-vocal-canceler"
            defaultValue={0}
            min={0}
            max={1}
            step={0.05}
            onChange={this.onChangeDepth}
          />
        </fieldset>
        <Modal isShow={isShowModalForFileUploadError} hasOverlay={true} title="Error" onClose={this.onClose}>
          {errorMessage}
        </Modal>
        <Modal isShow={isShowModalForDecodingError} hasOverlay={true} title="Error" onClose={this.onClose}>
          {errorMessage}
        </Modal>
        <Modal isShow={isShowModalForProgress} hasOverlay={true} title="Progress ..." onClose={this.onClose}>
          <p>{loaded} bytes ({rate} %)</p>
          <ProgressBar title="" progress={progress} rate={rate} auto={false} />
        </Modal>
        <Modal isShow={isShowModalForDecoding} hasOverlay={true} title="Decoding ..." onClose={this.onClose}>
          <ProgressBar title="" progress={true} rate={0} auto={true} />
        </Modal>
      </div>
    );
  }

  private readFile(event: React.SyntheticEvent): void {
    const options = {
      event   : event.nativeEvent,
      type    : 'ArrayBuffer',
      success : (event: Event, arrayBuffer: ArrayBuffer) => {
        X('audio').ready(arrayBuffer);

        event.currentTarget.value = '';
      },
      error   : (error: Error) => {
        this.setState({
          errorMessage                 : error.message,
          isShowModalForFileUploadError: true
        });
      },
      progress: (event: Event) => {
        const { lengthComputable, loaded, total } = event;

        this.setState({
          progress              : lengthComputable,
          loaded                : loaded,
          total                 : total,
          rate                  : lengthComputable && (total > 0) ? Math.floor((loaded / total) * 100) : 0,
          isShowModalForProgress: true
        });
      }
    };

    try {
      const file = X.file(options);

      this.setState({ filename: file.name });
    } catch (error: Error) {
      this.setState({
        errorMessage                 : error.message,
        isShowModalForFileUploadError: true
      });
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

  private onClose(): void {
    this.setState({
      isShowModalForFileUploadError: false,
      isShowModalForDecodingError  : false
    });
  }
}
