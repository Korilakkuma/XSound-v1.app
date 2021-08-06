import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { OscillatorSelector } from './OscillatorSelector';

describe('helpers/OscillatorSelector', () => {
  test('change', () => {
    const mockOnChange      = jest.fn();
    const mockOnChangeRadio = jest.fn();

    const props = {
      radioName    : 'oscillator-selector',
      type         : 'sawtooth' as const,
      onChange     : mockOnChange,
      onChangeRadio: mockOnChangeRadio
    };

    render(<OscillatorSelector {...props} />);

    const radios = screen.getAllByRole('radio');

    radios.forEach((radio: HTMLElement) => {
      fireEvent.click(radio);
    });

    expect(mockOnChange).toBeCalledTimes(3);
    expect(mockOnChangeRadio).toBeCalledTimes(3);
  });
});
