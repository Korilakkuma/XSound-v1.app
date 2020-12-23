import * as React from 'react';

interface Props {
  value: number;
  min: number;
  max: number;
  step: number;
  id?: string;
  onChange(event: React.SyntheticEvent): void;
}

const Spinner: React.FC<Props> = (props: Props) => {
  const { value, min, max, step, id, onChange } = props;

  return <input type="number" className="Spinner" id={id} value={value} min={min} max={max} step={step} onChange={onChange} />;
};

export default Spinner;
