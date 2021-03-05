import React from 'react';
import renderer from 'react-test-renderer';
import { Props, Spacer } from './Spacer';

describe('atoms/Spacer', () => {
  test('default', () => {
    const props = { space: 4 } as Props;

    const tree = renderer.create(<Spacer {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('top', () => {
    const props = {
      space    : 4,
      direction: 'top'
    } as Props;

    const tree = renderer.create(<Spacer {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('right', () => {
    const props = {
      space    : 4,
      direction: 'right'
    } as Props;

    const tree = renderer.create(<Spacer {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('bottom', () => {
    const props = {
      space    : 4,
      direction: 'bottom'
    } as Props;

    const tree = renderer.create(<Spacer {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('left', () => {
    const props = {
      space    : 4,
      direction: 'left'
    } as Props;

    const tree = renderer.create(<Spacer {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
