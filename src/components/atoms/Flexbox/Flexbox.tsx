import React from 'react';

export type Props = {
  children: React.ReactNode;
};

export const Flexbox: React.FC<Props> = (props: Props) => {
  return <div className='Flexbox'>{props.children}</div>;
};
