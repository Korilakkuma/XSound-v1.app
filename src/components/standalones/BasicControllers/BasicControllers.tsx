import * as React from 'react';
import { Dispatch } from 'redux';
import {
  changeCurrentSourceSource,
  changeAnalyserState,
  changeMMLState
} from '../../../actions';
import { Switch } from '../../atoms/Switch';
import { Select } from '../../atoms/Select';
import { ValueController } from '../../helpers/ValueController';
import { X } from 'xsound';

interface Props {
  dispatch: Dispatch;
  sources: string[];
}

interface State {
  analyserState: boolean;
  mmlState: boolean;
}

export default class BasicControllers extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      analyserState: false,
      mmlState     : false
    };

    this.onChangeMasterVolume       = this.onChangeMasterVolume.bind(this);
    this.onChangeGlide              = this.onChangeGlide.bind(this);
    this.onChangeTranspose          = this.onChangeTranspose.bind(this);
    this.onChangeCurrentSoundSource = this.onChangeCurrentSoundSource.bind(this);
    this.onChangeAnalyserState      = this.onChangeAnalyserState.bind(this);
    this.onChangeMMLState           = this.onChangeMMLState.bind(this);
  }

  render(): React.ReactNode {
    const { analyserState, mmlState } = this.state;

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
            'browniannoise'
          ]}
          texts={[
            'Oscillator',
            'Piano',
            'A. Guitar',
            'E. Guitar',
            'White Noise',
            'Pink Noise',
            'Brownian Noise',
            'Microphone',
            'MIDI'
          ]}
          width="20%"
          onChange={this.onChangeCurrentSoundSource}
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
      </div>
    );
  }

  private onChangeMasterVolume(event: React.SyntheticEvent): void {
    this.props.sources.forEach((source: string) => {
      if (X(source) !== null) {
        X(source).param('mastervolume', event.currentTarget.valueAsNumber);
      }

      if (window.C(source) !== null) {
        window.C(source).param('mastervolume', event.currentTarget.valueAsNumber);
      }
    });
  }

  private onChangeGlide(event: React.SyntheticEvent): void {
    X('oscillator').module('glide').param('time', event.currentTarget.valueAsNumber);
    window.C('oscillator').module('glide').param('time', event.currentTarget.valueAsNumber);
  }

  private onChangeTranspose(event: React.SyntheticEvent): void {
    const transpose = (event.currentTarget.valueAsNumber + 12) / 12;

    X('oneshot').param('transpose', transpose);
  }

  private onChangeCurrentSoundSource(event: React.SyntheticEvent): void {
    const source = event.currentTarget.value;

    this.props.dispatch(changeCurrentSourceSource(source));

    this.setState({ currentSoundSource: source }, () => {
      // TODO:
      switch (source) {
        case 'stream':
          break;
        case 'midi':
          break;
        default:
          break;
      }
    });
  }

  private onChangeAnalyserState(event: React.SyntheticEvent): void {
    this.props.dispatch(changeAnalyserState(event.currentTarget.checked));

    this.setState((prevState: State) => {
      return { analyserState: !prevState.analyserState };
    });
  }

  private onChangeMMLState(event: React.SyntheticEvent): void {
    this.props.dispatch(changeMMLState(event.currentTarget.checked));

    this.setState((prevState: State) => {
      return { mmlState: !prevState.mmlState };
    });
  }
}
