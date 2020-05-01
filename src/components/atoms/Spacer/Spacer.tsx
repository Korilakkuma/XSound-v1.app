import * as React from 'react';

interface Props {
  space: 2 | 4 | 8 | 12 | 16 | 20 | 24 | 28 | 32;
}

const Spacer: React.SFC<Props> = (props: Props) => {
  return <div role="presentation" className={`Spacer -space${props.space}`} />;
};

export default Spacer;
