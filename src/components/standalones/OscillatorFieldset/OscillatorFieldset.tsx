import React from 'react';
import { Spacer } from '../../atoms/Spacer';
import { Switch } from '../../atoms/Switch';
import { OscillatorSelector } from '../../helpers/OscillatorSelector';
import { ValueController } from '../../helpers/ValueController';

interface Props {
  oscillatorNumber: number;
  label: string;
  radioName: string;
  defaultState?: boolean;
  onChangeType(event: React.SyntheticEvent): void;
  onChangeState(event: React.SyntheticEvent): void;
  onChangeVolume(event: React.SyntheticEvent): void;
  onChangeOctave(event: React.SyntheticEvent): void;
  onChangeFine(event: React.SyntheticEvent): void;
}

const OscillatorFieldset: React.FC<Props> = (props: Props) => {
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
  } = props;

  return (
    <div className="OscillatorFieldset">
      <fieldset>
        <legend>
          <Switch
            id={`oscillator-fieldset-state-${oscillatorNumber}`}
            label={label}
            defaultChecked={Boolean(defaultState)}
            onChange={onChangeState}
          />
        </legend>
        <OscillatorSelector
          radioName={radioName}
          initialValue="sawtooth"
          onChange={onChangeType}
        />
        <Spacer space={16} />
        <ValueController
          label="Volume"
          id={`oscillator-fieldset-volume-${oscillatorNumber}`}
          defaultValue={1}
          min={0}
          max={1}
          step={0.05}
          onChange={onChangeVolume}
        />
        <Spacer space={8} />
        <ValueController
          label="Octave"
          id={`oscillator-fieldset-octave-${oscillatorNumber}`}
          defaultValue={0}
          min={-4}
          max={4}
          step={1}
          onChange={onChangeOctave}
        />
        <Spacer space={8} />
        <ValueController
          label="Fine"
          id={`oscillator-fieldset-fine-${oscillatorNumber}`}
          defaultValue={0}
          min={-1200}
          max={1200}
          step={1}
          onChange={onChangeFine}
        />
      </fieldset>
    </div>
  );
};

export default OscillatorFieldset;
