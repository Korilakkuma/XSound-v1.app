import React from 'react';
import renderer from 'react-test-renderer';
import { Props, Spinner } from './Spinner';

describe('atoms/Spinner', () => {
  test('render', () => {
    const props = {
      value   : 0,
      min     : -100,
      max     : 100,
      step    : 1,
      id      : 'spinner',
      onChange: (event: React.SyntheticEvent) => {
        alert(event.type);
      }
    } as Props;

    const tree = renderer.create(<Spinner {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
