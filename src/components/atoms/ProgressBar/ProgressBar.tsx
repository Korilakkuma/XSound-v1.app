import React from 'react';

export interface Props {
  title: string;
  rate: number;
  auto?: boolean;
  progress?: boolean;
}

export const ProgressBar: React.FC<Props> = (props: Props) => {
  const { title, rate, auto, progress } = props;

  return (
    <div className="ProgressBar" hidden={!progress}>
      {title ? <p className="ProgressBar__title">{title}</p> : null}
      <div className="ProgressBar__wrapper">
        <div className="ProgressBar__mask" />
        <div className={`ProgressBar__bar${auto ? ' -auto' : ''}`} style={{ width: `${rate}%` }} />
      </div>
    </div>
  );
};
