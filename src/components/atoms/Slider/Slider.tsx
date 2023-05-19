import React from 'react';

export type Props = {
  label: string,
  value: number,
  min: number,
  max: number,
  step: number,
  tabIndex?: number,
  onChange(event: React.ChangeEvent<HTMLInputElement>): void
};

export const Slider: React.FC<Props> = (props: Props) => {
  const { label, value, min, max, step, tabIndex, onChange } = props;

  const rate  = (value - min) / (max - min);
  const width = rate * 100;

  return (
    <div className="Slider">
      <div className="Slider__value" style={{ width: `calc(${width}% - (${rate} * 28px))` }} />
      <input type="range" aria-label={label} value={value} min={min} max={max} step={step} tabIndex={tabIndex} onChange={onChange} />
    </div>
  );
};
