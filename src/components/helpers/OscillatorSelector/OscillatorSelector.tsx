import React, { useState, useCallback } from 'react';
import { OscillatorType } from '../../../types/types';

export interface Props {
  radioName: string;
  defaultType: OscillatorType;
  onChange(event: React.SyntheticEvent): void;
}

export const OscillatorSelector: React.FC<Props> = (props: Props) => {
  const { radioName, defaultType, onChange } = props;

  const [type, setType] = useState<OscillatorType>(defaultType);

  const onChangeCallback = useCallback(onChange, [onChange]);

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
          break;
        }
      }
    }
  }, [radioName]);

  return (
    <form className="OscillatorSelector" onChange={onChangeTypeCallback}>
      <label className={`OscillatorSelector__sine${type === 'sine' ? ' -active' : ''}`}><input type="radio" name={`radio-${radioName}`} aria-label="sine" checked={type === 'sine'} value="sine" onChange={onChangeCallback} /></label>
      <label className={`OscillatorSelector__square${type === 'square' ? ' -active' : ''}`}><input type="radio" name={`radio-${radioName}`} aria-label="square" checked={type === 'square'} value="square" onChange={onChangeCallback} /></label>
      <label className={`OscillatorSelector__sawtooth${type === 'sawtooth' ? ' -active' : ''}`}><input type="radio" name={`radio-${radioName}`} aria-label="sawtooth" checked={type === 'sawtooth'} value="sawtooth" onChange={onChangeCallback} /></label>
      <label className={`OscillatorSelector__triangle${type === 'triangle' ? ' -active' : ''}`}><input type="radio" name={`radio-${radioName}`} aria-label="triangle" checked={type === 'triangle'} value="triangle" onChange={onChangeCallback} /></label>
    </form>
  );
};
