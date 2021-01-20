import React from 'react';

export interface Props {
  space: 2 | 4 | 8 | 12 | 16 | 20 | 24 | 28 | 32;
  direction?: 'top' | 'right' | 'bottom' | 'left';
}

export const Spacer: React.FC<Props> = (props: Props) => {
  const { space, direction } = props;

  let value = '';

  switch (direction) {
    case 'top':
      value = `${space}px 0 0 0`;
      break;
    case 'left':
      value = `0 0 0 ${space}px`;
      break;
    case 'right':
      value = `0 ${space}px 0 0`;
      break;
    case 'bottom':
      value = `0 0 ${space}px`;
      break;
    default:
      value = `0 0 ${space}px`;
      break;
  }

  return <div role="presentation" style={{ margin: value }} />;
};
