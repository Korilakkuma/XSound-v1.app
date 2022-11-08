import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Select } from './Select';

describe('atoms/Select', () => {
  test('change', () => {
    const mockOnChange = jest.fn();

    const props = {
      label   : 'Select',
      values  : ['A', 'B', 'C'],
      texts   : ['0 - 0', '0 - 1', '0 - 2'],
      disabled: false,
      onChange: mockOnChange
    };

    render(<Select {...props} />);

    fireEvent.change(screen.getByRole('combobox'));

    expect(mockOnChange).toBeCalledTimes(1);
  });
});
