import { fireEvent, render, screen } from '@testing-library/react';

import { ParameterController } from '/src/components/helpers/ParameterController';

describe('helpers/ParameterController', () => {
  test('change', () => {
    const mockOnChange = jest.fn();

    const props = {
      label: 'Value Controller',
      autoupdate: false,
      min: -100,
      max: 100,
      step: 1,
      defaultValue: 0,
      onChange: mockOnChange
    };

    render(<ParameterController {...props} />);

    const spinner = screen.getByRole('spinbutton');
    const slider = screen.getByRole('slider');

    fireEvent.change(spinner, { valueAsNumber: 100 });
    fireEvent.change(slider, { valueAsNumber: 100 });

    // expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  test('change (`autoupdate` is `true`)', () => {
    const props = {
      label: 'Value Controller',
      autoupdate: true,
      min: -100,
      max: 100,
      step: 1,
      defaultValue: 0,
      onChange: () => {}
    };

    render(<ParameterController {...props} />);
    render(<ParameterController {...props} defaultValue={1} />);

    const spinner = screen.getAllByRole('spinbutton')[1];
    const slider = screen.getAllByRole('slider')[1];

    expect((spinner as HTMLInputElement).valueAsNumber).toBe(1);
    expect((slider as HTMLInputElement).valueAsNumber).toBe(1);
  });
});
