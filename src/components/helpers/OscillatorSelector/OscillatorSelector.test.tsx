import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import { Props, OscillatorSelector } from './OscillatorSelector';

describe('helpers/OscillatorSelector', () => {
  test('render (type is sawtooth)', () => {
    const props = {
      radioName    : 'oscillator-selector',
      type         : 'sawtooth',
      onChange     : () => {},
      onChangeRadio: () => {}
    } as Props;

    const tree = renderer.create(<OscillatorSelector {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('render (type is sine)', () => {
    const props = {
      radioName    : 'oscillator-selector',
      type         : 'sine',
      onChange     : () => {},
      onChangeRadio: () => {}
    } as Props;

    const tree = renderer.create(<OscillatorSelector {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('render (type is square)', () => {
    const props = {
      radioName    : 'oscillator-selector',
      type         : 'square',
      onChange     : () => {},
      onChangeRadio: () => {}
    } as Props;

    const tree = renderer.create(<OscillatorSelector {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('render (type is triangle)', () => {
    const props = {
      radioName    : 'oscillator-selector',
      type         : 'triangle',
      onChange     : () => {},
      onChangeRadio: () => {}
    } as Props;

    const tree = renderer.create(<OscillatorSelector {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('change', () => {
    const mockOnChange      = jest.fn();
    const mockOnChangeRadio = jest.fn();

    const props = {
      radioName    : 'oscillator-selector',
      type         : 'sawtooth',
      onChange     : mockOnChange,
      onChangeRadio: mockOnChangeRadio
    } as Props;

    render(<OscillatorSelector {...props} />);

    const radios = screen.getAllByRole('radio');

    radios.forEach((radio: HTMLElement) => {
      fireEvent.click(radio);
    });

    expect(mockOnChange.mock.calls.length).toBe(3);
    expect(mockOnChangeRadio.mock.calls.length).toBe(3);
  });
});
