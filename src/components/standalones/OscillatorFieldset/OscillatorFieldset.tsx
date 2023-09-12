import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X } from 'xsound';

import { changeOscillatorStates } from '/src/slices';
import { Spacer } from '/src/components/atoms/Spacer';
import { Switch } from '/src/components/atoms/Switch';
import { OscillatorSelector } from '/src/components/helpers/OscillatorSelector';
import { ParameterController } from '/src/components/helpers/ParameterController';

import type { RootState } from '/src/store';

export type Props = {
  oscillatorNumber: number;
  label: string;
  radioName: string;
};

export const OscillatorFieldset: React.FC<Props> = ({ oscillatorNumber, label, radioName }) => {
  const [type, setType] = useState<OscillatorType>('sawtooth');

  const dispatch = useDispatch();

  const states = useSelector((state: RootState) => state.oscillatorStates);

  const onChangeStateCallback = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const checked = event.currentTarget.checked;

      for (let i = 0, len = X('oscillator').length(); i < len; i++) {
        if (oscillatorNumber === 0) {
          if (checked) {
            X('oscillator').get(i).activate();
          } else {
            X('oscillator').get(i).deactivate();
          }

          dispatch(changeOscillatorStates([checked, states[1]]));
        } else {
          if (checked) {
            window.clonedXSound('oscillator').get(i).activate();
          } else {
            window.clonedXSound('oscillator').get(i).deactivate();
          }

          dispatch(changeOscillatorStates([states[0], checked]));
        }
      }
    },
    [dispatch, states, oscillatorNumber]
  );

  const onChangeTypeCallback = useCallback(
    (event: React.ChangeEvent<HTMLFormElement>) => {
      const items = event.currentTarget.elements.namedItem(`radio-${radioName}`);

      if (!(items instanceof RadioNodeList)) {
        return;
      }

      const value = items.value;

      if (value === 'sine' || value === 'square' || value === 'sawtooth' || value === 'triangle') {
        setType(value);
      }
    },
    [radioName]
  );

  const onChangeRadioCallback = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const type = event.currentTarget.value;

      switch (type) {
        case 'sine':
        case 'square':
        case 'sawtooth':
        case 'triangle':
          for (let i = 0, len = X('oscillator').length(); i < len; i++) {
            if (oscillatorNumber === 0) {
              X('oscillator').get(i).param({ type });
            } else {
              window.clonedXSound('oscillator').get(i).param({ type });
            }
          }

          break;
        default:
          break;
      }
    },
    [oscillatorNumber]
  );

  const onChangeVolumeCallback = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const volume = event.currentTarget.valueAsNumber;

      for (let i = 0, len = X('oscillator').length(); i < len; i++) {
        if (oscillatorNumber === 0) {
          X('oscillator').get(i).param({ volume });
        } else {
          window.clonedXSound('oscillator').get(i).param({ volume });
        }
      }
    },
    [oscillatorNumber]
  );

  const onChangeOctaveCallback = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const octave = event.currentTarget.valueAsNumber;

      for (let i = 0, len = X('oscillator').length(); i < len; i++) {
        if (oscillatorNumber === 0) {
          X('oscillator').get(i).param({ octave });
        } else {
          window.clonedXSound('oscillator').get(i).param({ octave });
        }
      }
    },
    [oscillatorNumber]
  );

  const onChangeFineCallback = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const fine = event.currentTarget.valueAsNumber;

      for (let i = 0, len = X('oscillator').length(); i < len; i++) {
        if (oscillatorNumber === 0) {
          X('oscillator').get(i).param({ fine });
        } else {
          window.clonedXSound('oscillator').get(i).param({ fine });
        }
      }
    },
    [oscillatorNumber]
  );

  return (
    <div className='OscillatorFieldset'>
      <fieldset>
        <legend>
          <Switch label={label} checked={states[oscillatorNumber]} labelAsText={false} onChange={onChangeStateCallback} />
        </legend>
        <Spacer space={2} />
        <OscillatorSelector radioName={radioName} type={type} onChange={onChangeTypeCallback} onChangeRadio={onChangeRadioCallback} />
        <Spacer space={16} />
        <ParameterController label='Volume' autoupdate={false} defaultValue={1} min={0} max={1} step={0.05} onChange={onChangeVolumeCallback} />
        <Spacer space={8} />
        <ParameterController label='Octave' autoupdate={false} defaultValue={0} min={-4} max={4} step={1} onChange={onChangeOctaveCallback} />
        <Spacer space={8} />
        <ParameterController label='Fine' autoupdate={false} defaultValue={0} min={-1200} max={1200} step={1} onChange={onChangeFineCallback} />
      </fieldset>
    </div>
  );
};
