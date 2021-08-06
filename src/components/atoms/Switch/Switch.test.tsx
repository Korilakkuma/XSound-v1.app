import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Switch } from './Switch';

describe('atoms/Switch', () => {
  test('change', () => {
    const mockOnChange = jest.fn();

    const props = {
      id      : 'switch',
      label   : 'checked',
      checked : false,
      onChange: mockOnChange
    };

    render(<Switch {...props} />);

    const checkbox = screen.getByText('checked');

    fireEvent.click(checkbox);

    expect(mockOnChange).toBeCalledTimes(1);
  });

  test('keyboard access', () => {
    const mockOnChange = jest.fn();

    const props = {
      id      : 'switch',
      label   : 'checked',
      checked : false,
      onChange: mockOnChange
    };

    const spy = jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: { click: () => {} } });

    render(<Switch {...props} />);

    const checkbox = screen.getByText('checked');

    fireEvent.keyDown(checkbox, { key: 13, code: 'Space' });

    expect(mockOnChange).toBeCalledTimes(1);

    spy.mockRestore();
  });

  test('keyboard access (checkbox is `null`)', () => {
    const mockOnChange = jest.fn();

    const props = {
      id      : 'switch',
      label   : 'checked',
      checked : false,
      onChange: mockOnChange
    };

    const spy = jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: null });

    render(<Switch {...props} />);

    const checkbox = screen.getByText('checked');

    fireEvent.keyDown(checkbox, { key: 13, code: 'Space' });

    expect(mockOnChange).toBeCalledTimes(1);

    spy.mockRestore();
  });
});
