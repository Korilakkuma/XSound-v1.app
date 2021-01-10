import React from 'react';

interface Props {
  space: 2 | 4 | 8 | 12 | 16 | 20 | 24 | 28 | 32;
  direction?: 'Top' | 'Right' | 'Bottom' | 'Left';
}

const Spacer: React.FC<Props> = (props: Props) => {
  const { space, direction } = props;
  const margin = `margin${direction ? direction : 'Bottom'}`;

  return <div role="presentation" style={{ [margin]: `${space}px` }} />;
};

export default Spacer;
