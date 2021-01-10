import React from 'react';

interface Props {
  children: React.ReactNode;
}

const Flexbox: React.FC<Props> = (props: Props) => {
  return <div className="Flexbox">{props.children}</div>;
};

export default Flexbox;
