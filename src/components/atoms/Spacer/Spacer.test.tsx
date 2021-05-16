import React from 'react';
import renderer from 'react-test-renderer';
import { Spacer } from './Spacer';

describe('atoms/Spacer', () => {
  test('default', () => {
    const props = { space: 4 as const };

    const tree = renderer.create(<Spacer {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('top', () => {
    const props = {
      space    : 4 as const,
      direction: 'top' as const
    };

    const tree = renderer.create(<Spacer {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('right', () => {
    const props = {
      space    : 4 as const,
      direction: 'right' as const
    };

    const tree = renderer.create(<Spacer {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('bottom', () => {
    const props = {
      space    : 4 as const,
      direction: 'bottom' as const
    };

    const tree = renderer.create(<Spacer {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('left', () => {
    const props = {
      space    : 4 as const,
      direction: 'left' as const
    };

    const tree = renderer.create(<Spacer {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
