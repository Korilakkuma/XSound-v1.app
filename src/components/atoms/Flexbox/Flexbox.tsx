import * as React from 'react';

interface Props {
  children: React.ReactNode;
}

const Flexbox: React.SFC<Props> = (props: Props) => {
  return <div className="Flexbox">{props.children}</div>;
};

export default Flexbox;
