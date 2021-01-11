import React from 'react';

interface Props {
  active: boolean;
  label: string;
  width: number;
  height: number;
  image: string;
  size: string;
  onClick(event: React.SyntheticEvent): void;
}

const Button: React.FC<Props> = (props: Props) => {
  const {
    active,
    label,
    width,
    height,
    image,
    size,
    onClick
  } = props;

  return <button
    type="button"
    className={`Button${active ? ' -active' : ''}`}
    aria-label={label}
    style={{
      width: `${width}px`,
      height: `${height}px`,
      backgroundImage: `url("${image}")`,
      backgroundSize: size
    }}
    onClick={onClick}
  />;
};

export default Button;
