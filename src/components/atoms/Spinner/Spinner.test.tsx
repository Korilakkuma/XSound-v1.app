import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Spinner } from './Spinner';

describe('atoms/Spinner', () => {
  test('change', () => {
    const mockOnChange = jest.fn();

    const props = {
      value   : 0,
      min     : -100,
      max     : 100,
      step    : 1,
      id      : 'spinner',
      onChange: mockOnChange
    };

    render(<Spinner {...props} />);

    const spinner = screen.getByRole('spinbutton');

    fireEvent.change(spinner, { valueAsNumber: 100 });

    // expect(mockOnChange).toBeCalledTimes(1);
  });
});
