import React from 'react';
import renderer from 'react-test-renderer';
import { Props, Slider } from './Slider';

describe('atoms/Slider', () => {
  it('render', () => {
    const props = {
      value   : 0,
      min     : -100,
      max     : 100,
      step    : 1,
      onChange: (event: React.SyntheticEvent) => {
        alert(event.type);
      }
    } as Props;

    const tree = renderer.create(<Slider {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
