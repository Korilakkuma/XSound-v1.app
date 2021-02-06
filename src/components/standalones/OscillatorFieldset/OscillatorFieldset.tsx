import React, { useCallback } from 'react';
import { Spacer } from '../../atoms/Spacer';
import { Switch } from '../../atoms/Switch';
import { OscillatorSelector } from '../../helpers/OscillatorSelector';
import { ValueController } from '../../helpers/ValueController';
import { X } from 'xsound';

export interface Props {
  oscillatorNumber: number;
  label: string;
  radioName: string;
}

export const OscillatorFieldset: React.FC<Props> = (props: Props) => {
  const {
    oscillatorNumber,
    label,
    radioName
  } = props;

  const onChangeStateCallback = useCallback((event: React.SyntheticEvent) => {
    const state = (event.currentTarget as HTMLInputElement).checked;

    for (let i = 0, len = X('oscillator').length(); i < len; i++) {
      if (oscillatorNumber === 0) {
        X('oscillator').get(i).state(state);
      } else {
        window.C('oscillator').get(i).state(state);
      }
    }
  }, [oscillatorNumber]);

  const onChangeTypeCallback = useCallback((event: React.SyntheticEvent) => {
    const type = (event.currentTarget as HTMLInputElement).value;

    for (let i = 0, len = X('oscillator').length(); i < len; i++) {
      if (oscillatorNumber === 0) {
        X('oscillator').get(i).param('type', type);
      } else {
        window.C('oscillator').get(i).param('type', type);
      }
    }
  }, [oscillatorNumber]);

  const onChangeVolumeCallback = useCallback((event: React.SyntheticEvent) => {
    const volume = (event.currentTarget as HTMLInputElement).valueAsNumber;

    for (let i = 0, len = X('oscillator').length(); i < len; i++) {
      if (oscillatorNumber === 0) {
        X('oscillator').get(i).param('volume', volume);
      } else {
        window.C('oscillator').get(i).param('volume', volume);
      }
    }
  }, [oscillatorNumber]);

  const onChangeOctaveCallback = useCallback((event: React.SyntheticEvent) => {
    const octave = (event.currentTarget as HTMLInputElement).valueAsNumber;

    for (let i = 0, len = X('oscillator').length(); i < len; i++) {
      if (oscillatorNumber === 0) {
        X('oscillator').get(i).param('octave', octave);
      } else {
        window.C('oscillator').get(i).param('octave', octave);
      }
    }
  }, [oscillatorNumber]);

  const onChangeFineCallback = useCallback((event: React.SyntheticEvent) => {
    const fine = (event.currentTarget as HTMLInputElement).valueAsNumber;

    for (let i = 0, len = X('oscillator').length(); i < len; i++) {
      if (oscillatorNumber === 0) {
        X('oscillator').get(i).param('fine', fine);
      } else {
        window.C('oscillator').get(i).param('fine', fine);
      }
    }
  }, [oscillatorNumber]);

  return (
    <div className="OscillatorFieldset">
      <fieldset>
        <legend>
          <Switch
            id={`oscillator-fieldset-state-${oscillatorNumber}`}
            label={label}
            defaultChecked={oscillatorNumber === 0}
            onChange={onChangeStateCallback}
          />
        </legend>
        <OscillatorSelector
          radioName={radioName}
          defaultType="sawtooth"
          onChange={onChangeTypeCallback}
        />
        <Spacer space={16} />
        <ValueController
          label="Volume"
          id={`oscillator-fieldset-volume-${oscillatorNumber}`}
          defaultValue={1}
          min={0}
          max={1}
          step={0.05}
          onChange={onChangeVolumeCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Octave"
          id={`oscillator-fieldset-octave-${oscillatorNumber}`}
          defaultValue={0}
          min={-4}
          max={4}
          step={1}
          onChange={onChangeOctaveCallback}
        />
        <Spacer space={8} />
        <ValueController
          label="Fine"
          id={`oscillator-fieldset-fine-${oscillatorNumber}`}
          defaultValue={0}
          min={-1200}
          max={1200}
          step={1}
          onChange={onChangeFineCallback}
        />
      </fieldset>
    </div>
  );
};
