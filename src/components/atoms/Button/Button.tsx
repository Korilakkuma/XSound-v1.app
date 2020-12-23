import * as React from 'react';

interface Props {
  active: boolean;
  label: string;
  image: string;
  width: number;
  height: number;
  size: string;
  position?: string;
  onClick(event: React.SyntheticEvent): void;
}

const Button: React.FC<Props> = (props: Props) => {
  const {
    active,
    label,
    image,
    width,
    height,
    size,
    position,
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
      backgroundPosition: position ? position : undefined
    }}
    onClick={onClick}
  />;
};

export default Button;
