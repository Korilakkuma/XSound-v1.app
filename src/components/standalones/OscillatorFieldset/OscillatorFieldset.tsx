import * as React from 'react';
import { Spacer } from '../../atoms/Spacer';
import { Switch } from '../../atoms/Switch';
import { OscillatorSelector } from '../../helpers/OscillatorSelector';
import { ValueController } from '../../helpers/ValueController';

interface Props {
  oscillatorNumber: numbe;
  label: string;
  radioName: string;
  defaultState: boolean;
  onChangeType(event: React.SyntheticEvent): void;
  onChangeState(event: React.SyntheticEvent): void;
  onChangeVolume(event: React.SyntheticEvent): void;
  onChangeOctave(event: React.SyntheticEvent): void;
  onChangeFine(event: React.SyntheticEvent): void;
}

interface State {
  volume: number;
  octave: number;
  fine: number;
}

export default class OscillatorFieldset extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      volume: 1,
      octave: 0,
      fine  : 0
    };
  }

  render(): React.ReactNode {
    const {
      oscillatorNumber,
      label,
      radioName,
      defaultState,
      onChangeType,
      onChangeState,
      onChangeVolume,
      onChangeOctave,
      onChangeFine
    } = this.props;

    const { volume, octave, fine } = this.state;

    return (
      <div className="OscillatorFieldset">
        <fieldset>
          <legend>
            <Switch id={`oscillator-fieldset-state-${oscillatorNumber}`} label={label} defaultChecked={defaultState} onChange={onChangeState} />
          </legend>
          <OscillatorSelector radioName={radioName} initialValue="sawtooth" onChange={onChangeType} />
          <Spacer space={16} />
          <ValueController
            label="Volume"
            id={`oscillator-fieldset-volume-${oscillatorNumber}`}
            defaultValue={volume}
            min={0}
            max={1}
            step={0.05}
            onChange={onChangeVolume}
          />
          <Spacer space={8} />
          <ValueController
            label="Octave"
            id={`oscillator-fieldset-octave-${oscillatorNumber}`}
            defaultValue={octave}
            min={-4}
            max={4}
            step={1}
            onChange={onChangeOctave}
          />
          <Spacer space={8} />
          <ValueController
            label="Fine"
            id={`oscillator-fieldset-fine-${oscillatorNumber}`}
            defaultValue={fine}
            min={-1200}
            max={1200}
            step={1}
            onChange={onChangeFine}
          />
        </fieldset>
      </div>
    );
  }
}
