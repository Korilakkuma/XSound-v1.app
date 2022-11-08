import React, { useId } from 'react';

export interface Props {
  label?: string;
  rate?: number;
}

export const ProgressBar: React.FC<Props> = (props: Props) => {
  const { rate, label } = props;

  const manual = typeof rate === 'number';
  const style  = typeof rate === 'number' ? { width: `${(rate <= 100) ? rate : 100}%` } : {};

  const id = useId();

  return (
    <div className="ProgressBar">
      {manual && label ? <p id={id} className="ProgressBar__label">{label}</p> : null}
      <div className="ProgressBar__wrapper">
        <div role="presentation" className="ProgressBar__mask" />
        {manual
          ? (
            <div
              role="progressbar"
              aria-valuenow={rate}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-labelledby={id}
              style={style}
              className="ProgressBar__bar"
            />
          )
          : (
            <div
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              style={style}
              className="ProgressBar__bar -auto"
            />
          )}
      </div>
    </div>
  );
};
