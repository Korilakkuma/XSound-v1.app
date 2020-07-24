import * as React from 'react';

interface Props {
  children: React.ReactNode;
}

const VerticalBox: React.SFC<Props> = (props: Props) => {
  return <div className="VerticalBox">{props.children}</div>;
};

export default VerticalBox;
