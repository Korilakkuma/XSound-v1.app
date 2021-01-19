import React from 'react';

export interface Props {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange(event: React.SyntheticEvent): void;
}

export const Slider: React.FC<Props> = (props: Props) => {
  const { value, min, max, step, onChange } = props;

  const rate  = (value - min) / (max - min);
  const width = rate * 100;

  return (
    <div className="Slider">
      <label>
        <input type="range" value={value} min={min} max={max} step={step} onChange={onChange} />
        <div className="Slider__value" style={{ width: `calc(${width}% - (${rate} * 28px))` }} />
      </label>
    </div>
  );
};
