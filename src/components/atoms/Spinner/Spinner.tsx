import * as React from 'react';

interface Props {
  id?: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange(event: React.SyntheticEvent): void;
}

const Spinner: React.SFC<Props> = (props: Props) => {
  const { id, value, min, max, step, onChange } = props;

  return <input type="number" className="Spinner" id={id} value={value} min={min} max={max} step={step} onChange={onChange} />;
};

export default Spinner;
