import * as React from 'react';

interface Props {
  direction?: 'Top' | 'Right' | 'Bottom' | 'Left';
  space: 2 | 4 | 8 | 12 | 16 | 20 | 24 | 28 | 32;
}

const Spacer: React.SFC<Props> = (props: Props) => {
  const { direction, space } = props;
  const margin = `margin${direction ? direction : 'Bottom'}`;

  return <div role="presentation" style={{ [margin]: `${space}px` }} />;
};

export default Spacer;
