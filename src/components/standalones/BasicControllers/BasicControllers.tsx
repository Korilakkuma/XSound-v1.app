import * as React from 'react';
import { Dispatch } from 'redux';
import {
  SoundSource,
  MIDIAccess,
  MIDIInput,
  MIDIOutput,
  MIDIMessageEvent
} from '../../../types/types';
import {
  changeCurrentSoundSource,
  changeAnalyserState,
  changeMMLState
} from '../../../actions';
import { Switch } from '../../atoms/Switch';
import { Select } from '../../atoms/Select';
import { Modal } from '../../atoms/Modal';
import { ValueController } from '../../helpers/ValueController';
import { X } from 'xsound';

interface Props {
  dispatch: Dispatch;
  sources: string[];
}

interface State {
  currentSoundSource: SoundSource;
  analyserState: boolean;
  mmlState: boolean;
  errorMessage: string;
  isShowModalForMIDIError: boolean;
}

const MIN_NOTE_NUMBER = 21;
const MAX_NOTE_NUMBER = 108;
const MAX_VELOCITY    = 127;

function successCallback(source: string, midiAccess: MIDIAccess, inputs: MIDIInput[], outputs: MIDIOutput[]): void {
  const indexes: number[] = [];
  const volumes: number[] = [];

  const noteOn = (noteNumber: number, velocity: number) => {
    if ((noteNumber < MIN_NOTE_NUMBER) || (noteNumber > MAX_NOTE_NUMBER)) {
      return;
    }

    if ((velocity < 0) || (velocity > MAX_VELOCITY)) {
      return;
    }

    const targetIndex = noteNumber - MIN_NOTE_NUMBER;
    const volume      = velocity / MAX_VELOCITY;

    if (source === 'oscillator') {
      indexes.push(targetIndex);

      volumes[0] = X('oscillator', 0).param('volume') as number;
      volumes[1] = window.C('oscillator', 0).param('volume') as number;

      for (let i = 0, len = X('oscillator').length(); i < len; i++) {
        if (i !== 0) {
          X('oscillator').get(i).state(true);
          window.C('oscillator').get(i).state(true);
        }

        X('oscillator').get(i).param('volume', volume);
        window.C('oscillator').get(i).param('volume', volume);
      }

      X('oscillator').ready(0, 0).start(X.toFrequencies(indexes));
      window.C('oscillator').ready(0, 0).start(X.toFrequencies(indexes));

      X('mixer').mix([X('oscillator'), window.C('oscillator')]);

      X('mixer').module('recorder').start();
      X('mixer').module('session').start();
    } else {
      X('oneshot').reset(targetIndex, 'volume', volume).ready(0, 0).start(targetIndex);

      X('oneshot').module('recorder').start();
      X('oneshot').module('session').start();
    }
  };

  const noteOff = (noteNumber: number, velocity: number) => {
    if ((noteNumber < MIN_NOTE_NUMBER) || (noteNumber > MAX_NOTE_NUMBER)) {
      return;
    }

    if ((velocity < 0) || (velocity > MAX_VELOCITY)) {
      return;
    }

    const targetIndex = noteNumber - MIN_NOTE_NUMBER;

    if (source === 'oscillator') {
      const index = indexes.indexOf(targetIndex);

      if (index !== -1) {
        indexes.splice(index, 1);
      }

      X('oscillator').stop();
      window.C('oscillator').stop();

      for (let i = 0, len = X('oscillator').length(); i < len; i++) {
        if (i !== 0) {
          X('oscillator').get(i).state(false);
          window.C('oscillator').get(i).state(false);
        }

        X('oscillator').get(i).param('volume', volumes[0]);
        window.C('oscillator').get(i).param('volume', volumes[1]);
      }
    } else {
      X('oneshot').stop(targetIndex).reset(targetIndex, 'volume', 1);
    }
  };

  if (inputs.length > 0) {
    inputs[0].onmidimessage = (event: MIDIMessageEvent) => {
      switch (event.data[0] & 0xf0) {
        case 0x90:
          noteOn(event.data[1], event.data[2]);
          break;
        case 0x80:
          noteOff(event.data[1], event.data[2]);
          break;
        default :
          break;
      }
    };
  }

  if (outputs.length > 0) {
    // TODO: do something ...
  }
}

export default class BasicControllers extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      currentSoundSource     : 'oscillator',
      analyserState          : false,
      mmlState               : false,
      errorMessage           : '',
      isShowModalForMIDIError: false
    };

    this.onChangeMasterVolume  = this.onChangeMasterVolume.bind(this);
    this.onChangeGlide         = this.onChangeGlide.bind(this);
    this.onChangeTranspose     = this.onChangeTranspose.bind(this);
    this.onChangeSoundSource   = this.onChangeSoundSource.bind(this);
    this.onChangeAnalyserState = this.onChangeAnalyserState.bind(this);
    this.onChangeMMLState      = this.onChangeMMLState.bind(this);

    this.onCloseModal = this.onCloseModal.bind(this);
  }

  render(): React.ReactNode {
    const {
      analyserState,
      mmlState,
      errorMessage,
      isShowModalForMIDIError
    } = this.state;

    return (
      <div className="BasicControllers">
        <ValueController
          label="Master Volume"
          id="master-volume"
          defaultValue={1}
          min={0}
          max={1}
          step={0.05}
          width="20%"
          onChange={this.onChangeMasterVolume}
        />
        <ValueController
          label="Glide"
          id="glide"
          defaultValue={0}
          min={0}
          max={1}
          step={0.05}
          width="20%"
          onChange={this.onChangeGlide}
        />
        <ValueController
          label="Transpose"
          id="transpose"
          defaultValue={0}
          min={-6}
          max={6}
          step={1}
          width="20%"
          onChange={this.onChangeTranspose}
        />
        <Select
          values={[
            'oscillator',
            'piano',
            'guitar',
            'electric-guitar',
            'whitenoise',
            'pinknoise',
            'browniannoise',
            'stream',
            'midi'
          ]}
          texts={[
            'OSCILLATOR',
            'PIANO',
            'A. GUITAR',
            'E. GUITAR',
            'WHITE NOISE',
            'PINK NOISE',
            'BROWNIAN NOISE',
            'MICROPHONE',
            'MIDI'
          ]}
          width="20%"
          onChange={this.onChangeSoundSource}
        />
        <Switch
          id="analyser"
          label="Analyser"
          defaultChecked={analyserState}
          onChange={this.onChangeAnalyserState}
        />
        <Switch
          id="mml"
          label="MML"
          defaultChecked={mmlState}
          onChange={this.onChangeMMLState}
        />
        <Modal
          hasOverlay
          isShow={isShowModalForMIDIError}
          title="Error"
          onClose={this.onCloseModal}
        >
          {errorMessage}
        </Modal>
      </div>
    );
  }

  private onChangeMasterVolume(event: React.SyntheticEvent): void {
    this.props.sources.forEach((source: string) => {
      if (X(source) !== null) {
        X(source).param('mastervolume', (event.currentTarget as HTMLInputElement).valueAsNumber);
      }

      if (window.C(source) !== null) {
        window.C(source).param('mastervolume', (event.currentTarget as HTMLInputElement).valueAsNumber);
      }
    });
  }

  private onChangeGlide(event: React.SyntheticEvent): void {
    X('oscillator').module('glide').param('time', (event.currentTarget as HTMLInputElement).valueAsNumber);
    window.C('oscillator').module('glide').param('time', (event.currentTarget as HTMLInputElement).valueAsNumber);
  }

  private onChangeTranspose(event: React.SyntheticEvent): void {
    const transpose = ((event.currentTarget as HTMLInputElement).valueAsNumber + 12) / 12;

    X('oneshot').param('transpose', transpose);
  }

  private onChangeSoundSource(event: React.SyntheticEvent): void {
    const source = (event.currentTarget as HTMLInputElement).value as SoundSource;

    this.props.dispatch(changeCurrentSoundSource(source));

    this.setState({ currentSoundSource: source }, () => {
      X('stream').stop();

      switch (source) {
        case 'stream':
          X('stream').start();
          X('stream').module('session').start();
          break;
        case 'midi':
          try {
            X('midi').setup(true, (midiAccess: MIDIAccess, inputs: MIDIInput[], outputs: MIDIOutput[]) => {
              successCallback(source, midiAccess, inputs, outputs);
            }, () => {
              this.setState({
                errorMessage           : 'Cannot use Web MIDI API.',
                isShowModalForMIDIError: true
              });
            });
          } catch (error) {
            this.setState({
              errorMessage           : error.message,
              isShowModalForMIDIError: true
            });
          }
          break;
        default:
          break;
      }
    });
  }

  private onChangeAnalyserState(event: React.SyntheticEvent): void {
    this.props.dispatch(changeAnalyserState((event.currentTarget as HTMLInputElement).checked));

    this.setState((prevState: State) => {
      return { analyserState: !prevState.analyserState };
    });
  }

  private onChangeMMLState(event: React.SyntheticEvent): void {
    this.props.dispatch(changeMMLState((event.currentTarget as HTMLInputElement).checked));

    this.setState((prevState: State) => {
      return { mmlState: !prevState.mmlState };
    });
  }

  private onCloseModal(): void {
    this.setState({
      errorMessage           : '',
      isShowModalForMIDIError: false
    });
  }
}
