import React from 'react';

export interface Props {
  active: boolean;
  label: string;
  width: number;
  height: number;
  image: string;
  size: string;
  onClick(event: React.SyntheticEvent): void;
}

export const Button: React.FC<Props> = (props: Props) => {
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
