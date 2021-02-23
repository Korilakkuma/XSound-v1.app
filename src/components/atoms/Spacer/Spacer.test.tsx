import React from 'react';
import renderer from 'react-test-renderer';
import { Props, Spacer } from './Spacer';

describe('atoms/Spacer', () => {
  it('default', () => {
    const props = { space: 4 } as Props;

    const tree = renderer.create(<Spacer {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('top', () => {
    const props = {
      space    : 4,
      direction: 'top'
    } as Props;

    const tree = renderer.create(<Spacer {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('right', () => {
    const props = {
      space    : 4,
      direction: 'right'
    } as Props;

    const tree = renderer.create(<Spacer {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('bottom', () => {
    const props = {
      space    : 4,
      direction: 'bottom'
    } as Props;

    const tree = renderer.create(<Spacer {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('left', () => {
    const props = {
      space    : 4,
      direction: 'left'
    } as Props;

    const tree = renderer.create(<Spacer {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
