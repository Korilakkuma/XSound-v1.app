import React from 'react';

export interface Props {
  id?: string;
  label?: string;
  rate?: number;
}

export const ProgressBar: React.FC<Props> = (props: Props) => {
  const { rate, id, label } = props;

  const manual = typeof rate === 'number';
  const style  = typeof rate === 'number' ? { width: `${(rate <= 100) ? rate : 100}%` } : {};

  return (
    <div className="ProgressBar">
      {manual && label ? <p id={id} className="ProgressBar__label">{label}</p> : null}
      <div className="ProgressBar__wrapper">
        <div role="presetation" className="ProgressBar__mask" />
        {manual ? <div aria-labelledby={id} className="ProgressBar__bar" style={style} /> : <div className="ProgressBar__bar -auto" />}
      </div>
    </div>
  );
};
