import React from 'react';

export type Props = {
  numberOfDivisions: number;
  children: React.ReactNode;
};

export const VerticalBox: React.FC<Props> = ({ numberOfDivisions, children }) => {
  return <div style={{ width: `calc(100% / ${numberOfDivisions > 0 ? numberOfDivisions : 1})` }}>{children}</div>;
};
