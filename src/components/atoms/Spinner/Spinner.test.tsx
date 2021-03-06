import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import { Props, Spinner } from './Spinner';

describe('atoms/Spinner', () => {
  test('render', () => {
    const props = {
      value   : 0,
      min     : -100,
      max     : 100,
      step    : 1,
      id      : 'spinner',
      onChange: () => {}
    } as Props;

    const tree = renderer.create(<Spinner {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('change', () => {
    const mockOnChange = jest.fn();

    const props = {
      value   : 0,
      min     : -100,
      max     : 100,
      step    : 1,
      id      : 'spinner',
      onChange: mockOnChange
    } as Props;

    render(<Spinner {...props} />);

    const spinner = screen.getByRole('spinbutton');

    fireEvent.change(spinner, { valueAsNumber: 100 });

    // expect(mockOnChange.mock.calls.length).toBe(1);
  });
});
