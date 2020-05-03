import * as React from 'react';

interface Props {
  title: string;
  progress: boolean;
  rate: number;
  auto: boolean;
}

const ProgressBar: React.SFC<Props> = (props: Props) => {
  const { title, progress, rate, auto } = props;

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

export default ProgressBar;
