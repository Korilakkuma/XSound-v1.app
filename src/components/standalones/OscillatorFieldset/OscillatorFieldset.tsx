import React, { useState, useCallback } from 'react';
import { OscillatorType } from '../../../types';
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
  const { oscillatorNumber, label, radioName } = props;

  const [oscillator, setOscillator] = useState<boolean>(oscillatorNumber === 0);
  const [type, setType] = useState<OscillatorType>('sawtooth');

  const onChangeStateCallback = useCallback((event: React.SyntheticEvent) => {
    const state = (event.currentTarget as HTMLInputElement).checked;

    for (let i = 0, len = X('oscillator').length(); i < len; i++) {
      if (oscillatorNumber === 0) {
        X('oscillator').get(i).state(state);
        setOscillator(state);
      } else {
        window.C('oscillator').get(i).state(state);
        setOscillator(state);
      }
    }
  }, [oscillatorNumber]);

  const onChangeTypeCallback = useCallback((event: React.SyntheticEvent) => {
    const form  = event.currentTarget as HTMLFormElement;
    const name  = `radio-${radioName}`;
    const items = form.elements.namedItem(name) as RadioNodeList;

    if (items === null) {
      return;
    }

    for (let i = 0, len = items.length; i < len; i++) {
      const item = items[i] as HTMLInputElement;

      const { checked, value } = item;

      if (checked) {
        if ((value === 'sine') || (value === 'square') || (value === 'sawtooth') || (value === 'triangle')) {
          setType(value);
          return;
        }

        return;
      }
    }
  }, [radioName]);

  const onChangeRadioCallback = useCallback((event: React.SyntheticEvent) => {
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
            checked={oscillator}
            onChange={onChangeStateCallback}
          />
        </legend>
        <Spacer space={2} />
        <OscillatorSelector
          radioName={radioName}
          type={type}
          onChange={onChangeTypeCallback}
          onChangeRadio={onChangeRadioCallback}
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
