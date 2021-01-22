import React from 'react';

export interface Props {
  children: React.ReactNode;
}

export const VerticalBox: React.FC<Props> = (props: Props) => {
  return <div className="VerticalBox">{props.children}</div>;
};
