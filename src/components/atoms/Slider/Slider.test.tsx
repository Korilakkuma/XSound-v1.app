import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import { Slider } from './Slider';

describe('atoms/Slider', () => {
  test('render', () => {
    const props = {
      value   : 0,
      min     : -100,
      max     : 100,
      step    : 1,
      onChange: () => {}
    };

    const tree = renderer.create(<Slider {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('change', () => {
    const mockOnChange = jest.fn();

    const props = {
      value   : 0,
      min     : -100,
      max     : 100,
      step    : 1,
      onChange: mockOnChange
    };

    render(<Slider {...props} />);

    const slider = screen.getByRole('slider');

    fireEvent.change(slider, { valueAsNumber: 100 });

    // expect(mockOnChange.mock.calls.length).toBe(1);
  });
});
