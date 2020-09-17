import * as React from 'react';

interface Props {
  label: string;
  image: string;
  width: number;
  height: number;
  size: string;
  position: string;
  active: boolean;
  onClick(event: React.SyntheticEvent): void;
}

const Button: React.SFC<Props> = (props: Props) => {
  const {
    label,
    image,
    width,
    height,
    size,
    position,
    active,
    onClick
  } = props;

  return <button
    type="button"
    className={`Button${active ? ' -active' : ''}`}
    aria-label={label}
    style={{
      width: `${width}px`,
      height: `${height}px`,
      backgroundImage: `url(${image})`,
      backgroundSize: size,
      backgroundPosition: position
    }}
    onClick={onClick}
  />;
};

export default Button;
