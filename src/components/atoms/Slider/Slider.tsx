import React, { useMemo } from 'react';

export type Props = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  tabIndex?: number | undefined;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
};

export const Slider: React.FC<Props> = (props: Props) => {
  const { label, value, min, max, step, tabIndex, onChange } = props;

  const rate = useMemo(() => {
    return ((value - min) / (max - min)) * 100;
  }, [value, min, max]);

  return (
    <div className='Slider'>
      <input
        type='range'
        aria-label={label}
        value={value}
        min={min}
        max={max}
        step={step}
        tabIndex={tabIndex}
        onChange={onChange}
        style={{ backgroundImage: `linear-gradient(90deg, #d7d7d7 ${rate}%, #333 ${rate}%` }}
      />
    </div>
  );
};
