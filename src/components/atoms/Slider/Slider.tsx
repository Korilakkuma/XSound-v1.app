import * as React from 'react';

interface Props {
  id?: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange(event: React.SyntheticEvent): void;
}

const Slider: React.SFC<Props> = (props: Props) => {
  const { id, value, min, max, step, onChange } = props;

  const rate  = value / max;
  const width = rate * 100;

  return (
    <div className="Slider">
      <input type="range" id={id} value={value} min={min} max={max} step={step} onChange={onChange} />
      <div className="Slider__value" style={{ width: `calc(${width}% - (${rate} * 18px))` }} />
    </div>
  );
};

export default Slider;
