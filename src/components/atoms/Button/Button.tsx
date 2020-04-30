import * as React from 'react';

interface Props {
  label: string;
  image: string;
  width: number;
  height: number;
  size: string;
  ative: boolean;
  onClick(event: React.SyntheticEvent): void;
}

const Button: React.SFC<Props> = (props: Props) => {
  const { label, image, width, height, size, active, onClick } = props;

  return <button
    type="button"
    className={`Button${active ? ' -active' : ''}`}
    aria-label={label}
    style={{
      width: `${width}px`,
      height: `${height}px`,
      backgroundImage: `url(${image})`,
      backgroundSize: size
    }}
    onClick={onClick}
  />;
};

export default Button;
