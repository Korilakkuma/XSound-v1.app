import { fireEvent, render, screen } from '@testing-library/react';

import { Spinner } from '/src/components/atoms/Spinner';

describe('atoms/Spinner', () => {
  test('change', () => {
    const mockOnChange = jest.fn();

    const props = {
      value: 0,
      min: -100,
      max: 100,
      step: 1,
      id: 'spinner',
      onChange: mockOnChange
    };

    render(<Spinner {...props} />);

    const spinner = screen.getByRole('spinbutton');

    fireEvent.change(spinner, { valueAsNumber: 100 });

    // expect(mockOnChange).toHaveBeenCalledTimes(1);
  });
});
