import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ValueController } from './ValueController';

describe('helpers/ValueController', () => {
  test('change', () => {
    const mockOnChange = jest.fn();

    const props = {
      label       : 'Value Controller',
      id          : 'value-controller',
      min         : -100,
      max         : 100,
      step        : 1,
      defaultValue: 0,
      onChange    : mockOnChange
    };

    render(<ValueController {...props} />);

    const spinner = screen.getByRole('spinbutton');
    const slider  = screen.getByRole('slider');

    fireEvent.change(spinner, { valueAsNumber: 100 });
    fireEvent.change(slider,  { valueAsNumber: 100 });

    // expect(mockOnChange.mock.calls.length).toBe(2);
  });

  test('change (id is `audio-fieldset-current-time`)', () => {
    const props = {
      label       : 'Value Controller',
      id          : 'audio-fieldset-current-time',
      min         : -100,
      max         : 100,
      step        : 1,
      defaultValue: 0,
      onChange    : () => {}
    };

    render(<ValueController {...props} />);
    render(<ValueController {...props} defaultValue={1} />);

    const spinner = screen.getAllByRole('spinbutton')[1];
    const slider  = screen.getAllByRole('slider')[1];

    expect((spinner as HTMLInputElement).valueAsNumber).toBe(1);
    expect((slider  as HTMLInputElement).valueAsNumber).toBe(1);
  });
});
