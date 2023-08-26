import { fireEvent, render, screen } from '@testing-library/react';

import { Slider } from '/src/components/atoms/Slider';

describe('atoms/Slider', () => {
  test('change', () => {
    const mockOnChange = jest.fn();

    const props = {
      label: 'slider',
      value: 0,
      min: -100,
      max: 100,
      step: 1,
      onChange: mockOnChange
    };

    render(<Slider {...props} />);

    const slider = screen.getByRole('slider');

    fireEvent.change(slider, { valueAsNumber: 100 });

    // expect(mockOnChange).toHaveBeenCalledTimes(1);
  });
});
