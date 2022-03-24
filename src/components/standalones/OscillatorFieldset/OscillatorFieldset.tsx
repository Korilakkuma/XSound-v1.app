import React, { useState, useCallback } from 'react';
import { Spacer } from '../../atoms/Spacer';
import { Switch } from '../../atoms/Switch';
import { OscillatorSelector } from '../../helpers/OscillatorSelector';
import { ParameterController } from '../../helpers/ParameterController';
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

  const onChangeStateCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.currentTarget.checked;

    for (let i = 0, len = X('oscillator').length(); i < len; i++) {
      if (oscillatorNumber === 0) {
        if (checked) {
          X('oscillator').get(i).activate();
        } else {
          X('oscillator').get(i).deactivate();
        }

        setOscillator(checked);
      } else {
        if (checked) {
          window.C('oscillator').get(i).activate();
        } else {
          window.C('oscillator').get(i).deactivate();
        }

        setOscillator(checked);
      }
    }
  }, [oscillatorNumber]);

  const onChangeTypeCallback = useCallback((event: React.ChangeEvent<HTMLFormElement>) => {
    const items = event.currentTarget.elements.namedItem(`radio-${radioName}`);

    if (!(items instanceof RadioNodeList)) {
      return;
    }

    const value = items.value;

    if ((value === 'sine') || (value === 'square') || (value === 'sawtooth') || (value === 'triangle')) {
      setType(value);
    }
  }, [radioName]);

  const onChangeRadioCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const type = event.currentTarget.value;

    switch (type) {
      case 'sine'    :
      case 'square'  :
      case 'sawtooth':
      case 'triangle':
        for (let i = 0, len = X('oscillator').length(); i < len; i++) {
          if (oscillatorNumber === 0) {
            X('oscillator').get(i).param({ type });
          } else {
            window.C('oscillator').get(i).param({ type });
          }
        }

        break;
      default:
        break;
    }
  }, [oscillatorNumber]);

  const onChangeVolumeCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const volume = event.currentTarget.valueAsNumber;

    for (let i = 0, len = X('oscillator').length(); i < len; i++) {
      if (oscillatorNumber === 0) {
        X('oscillator').get(i).param({ volume });
      } else {
        window.C('oscillator').get(i).param({ volume });
      }
    }
  }, [oscillatorNumber]);

  const onChangeOctaveCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const octave = event.currentTarget.valueAsNumber;

    for (let i = 0, len = X('oscillator').length(); i < len; i++) {
      if (oscillatorNumber === 0) {
        X('oscillator').get(i).param({ octave });
      } else {
        window.C('oscillator').get(i).param({ octave });
      }
    }
  }, [oscillatorNumber]);

  const onChangeFineCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const fine = event.currentTarget.valueAsNumber;

    for (let i = 0, len = X('oscillator').length(); i < len; i++) {
      if (oscillatorNumber === 0) {
        X('oscillator').get(i).param({ fine });
      } else {
        window.C('oscillator').get(i).param({ fine });
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
        <ParameterController
          label="Volume"
          id={`oscillator-fieldset-volume-${oscillatorNumber}`}
          defaultValue={1}
          min={0}
          max={1}
          step={0.05}
          onChange={onChangeVolumeCallback}
        />
        <Spacer space={8} />
        <ParameterController
          label="Octave"
          id={`oscillator-fieldset-octave-${oscillatorNumber}`}
          defaultValue={0}
          min={-4}
          max={4}
          step={1}
          onChange={onChangeOctaveCallback}
        />
        <Spacer space={8} />
        <ParameterController
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
