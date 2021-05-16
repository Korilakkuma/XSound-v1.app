import React from 'react';

export interface Props {
  value: number;
  min: number;
  max: number;
  step: number;
  id?: string;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
}

export const Spinner: React.FC<Props> = (props: Props) => {
  const { value, min, max, step, id, onChange } = props;

  return <input type="number" className="Spinner" id={id} value={value} min={min} max={max} step={step} onChange={onChange} />;
};
