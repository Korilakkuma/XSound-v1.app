import React from 'react';

export interface Props {
  space: 2 | 4 | 8 | 12 | 16 | 20 | 24 | 28 | 32;
  direction?: 'top' | 'right' | 'bottom' | 'left';
}

export const Spacer: React.FC<Props> = (props: Props) => {
  const { space, direction } = props;

  switch (direction) {
    case 'top':
      return <div role="presentation" style={{ marginTop: `${space}px` }} />;
    case 'left':
      return <div role="presentation" style={{ width: `${space}px`, height: '1px' }} />;
    case 'right':
      return <div role="presentation" style={{ width: `${space}px`, height: '1px' }} />;
    case 'bottom':
      return <div role="presentation" style={{ marginBottom: `${space}px` }} />;
    default:
      return <div role="presentation" style={{ marginBottom: `${space}px` }} />;
  }
};
