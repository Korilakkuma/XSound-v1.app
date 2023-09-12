import React from 'react';

export type Props = {
  active: boolean;
  label: string;
  width: number;
  height: number;
  image: string;
  size: string;
  onClick(event: React.MouseEvent<HTMLButtonElement>): void;
};

export const Button: React.FC<Props> = (props: Props) => {
  const { active, label, width, height, image, size, onClick } = props;

  return (
    <button
      type='button'
      aria-label={label}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundImage: `url("${image}")`,
        backgroundSize: size
      }}
      className={`Button${active ? ' -active' : ''}`}
      onClick={onClick}
    />
  );
};
