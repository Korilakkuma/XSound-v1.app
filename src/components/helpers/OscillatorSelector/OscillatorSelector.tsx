import React from 'react';

export interface Props {
  radioName: string;
  type: OscillatorType;
  onChange(event: React.SyntheticEvent): void;
  onChangeRadio(event: React.SyntheticEvent): void;
}

export const OscillatorSelector: React.FC<Props> = (props: Props) => {
  const { radioName, type, onChange, onChangeRadio } = props;

  return (
    <form name={radioName} className="OscillatorSelector" onChange={onChange}>
      <label tabIndex={0} className={`OscillatorSelector__sine${type === 'sine' ? ' -active' : ''}`}><input type="radio" name={`radio-${radioName}`} aria-label="sine" checked={type === 'sine'} value="sine" onChange={onChangeRadio} /></label>
      <label tabIndex={0} className={`OscillatorSelector__square${type === 'square' ? ' -active' : ''}`}><input type="radio" name={`radio-${radioName}`} aria-label="square" checked={type === 'square'} value="square" onChange={onChangeRadio} /></label>
      <label tabIndex={0} className={`OscillatorSelector__sawtooth${type === 'sawtooth' ? ' -active' : ''}`}><input type="radio" name={`radio-${radioName}`} aria-label="sawtooth" checked={type === 'sawtooth'} value="sawtooth" onChange={onChangeRadio} /></label>
      <label tabIndex={0} className={`OscillatorSelector__triangle${type === 'triangle' ? ' -active' : ''}`}><input type="radio" name={`radio-${radioName}`} aria-label="triangle" checked={type === 'triangle'} value="triangle" onChange={onChangeRadio} /></label>
    </form>
  );
};
