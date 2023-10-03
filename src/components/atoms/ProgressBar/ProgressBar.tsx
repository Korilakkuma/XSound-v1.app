import React, { useId, useMemo } from 'react';

export type Props = {
  label?: string | undefined;
  rate?: number | undefined;
};

export const ProgressBar: React.FC<Props> = (props: Props) => {
  const { rate, label } = props;

  const manual = typeof rate === 'number';
  const style = typeof rate === 'number' ? { width: `${rate <= 100 ? rate : 100}%` } : {};

  const id = useId();

  const value = useMemo(() => {
    if (!rate) {
      return 0;
    }

    return rate > 100 ? 100 : rate;
  }, [rate]);

  return (
    <div className='ProgressBar'>
      {label ? (
        <p id={id} className='ProgressBar__label'>
          {label}
        </p>
      ) : null}
      <div className='ProgressBar__wrapper'>
        <div role='presentation' className='ProgressBar__mask' />
        {manual ? (
          <progress value={value} max={100} className='ProgressBar__bar'>
            {value}%
          </progress>
        ) : (
          <div role='progressbar' aria-valuemin={0} aria-valuemax={100} style={style} className='ProgressBar__bar -auto' />
        )}
      </div>
    </div>
  );
};
