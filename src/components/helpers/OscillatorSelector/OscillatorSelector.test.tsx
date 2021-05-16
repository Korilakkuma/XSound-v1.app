import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import { OscillatorSelector } from './OscillatorSelector';

describe('helpers/OscillatorSelector', () => {
  test('render (type is sawtooth)', () => {
    const props = {
      radioName    : 'oscillator-selector',
      type         : 'sawtooth' as const,
      onChange     : () => {},
      onChangeRadio: () => {}
    };

    const tree = renderer.create(<OscillatorSelector {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('render (type is sine)', () => {
    const props = {
      radioName    : 'oscillator-selector',
      type         : 'sine' as const,
      onChange     : () => {},
      onChangeRadio: () => {}
    };

    const tree = renderer.create(<OscillatorSelector {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('render (type is square)', () => {
    const props = {
      radioName    : 'oscillator-selector',
      type         : 'square' as const,
      onChange     : () => {},
      onChangeRadio: () => {}
    };

    const tree = renderer.create(<OscillatorSelector {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('render (type is triangle)', () => {
    const props = {
      radioName    : 'oscillator-selector',
      type         : 'triangle' as const,
      onChange     : () => {},
      onChangeRadio: () => {}
    };

    const tree = renderer.create(<OscillatorSelector {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

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

    expect(mockOnChange.mock.calls.length).toBe(3);
    expect(mockOnChangeRadio.mock.calls.length).toBe(3);
  });
});
