import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { Switch } from '/src/components/atoms/Switch/Switch';

describe('atoms/Switch', () => {
  test('change', () => {
    const mockOnChange = jest.fn();

    const props = {
      label: 'checked',
      checked: false,
      labelAsText: false,
      onChange: mockOnChange
    };

    render(<Switch {...props} />);

    const checkbox = screen.getByText('checked');

    fireEvent.click(checkbox);

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  test('keyboard access', () => {
    const mockOnChange = jest.fn();

    const props = {
      label: 'checked',
      checked: false,
      labelAsText: false,
      onChange: mockOnChange
    };

    const spy = jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: { click: () => {} } });

    render(<Switch {...props} />);

    const checkbox = screen.getByText('checked');

    fireEvent.keyDown(checkbox, { key: 13, code: 'Space' });

    expect(mockOnChange).toHaveBeenCalledTimes(1);

    spy.mockRestore();
  });

  test('keyboard access (checkbox is `null`)', () => {
    const mockOnChange = jest.fn();

    const props = {
      label: 'checked',
      checked: false,
      labelAsText: false,
      onChange: mockOnChange
    };

    const spy = jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: null });

    render(<Switch {...props} />);

    const checkbox = screen.getByText('checked');

    fireEvent.keyDown(checkbox, { key: 13, code: 'Space' });

    expect(mockOnChange).toHaveBeenCalledTimes(1);

    spy.mockRestore();
  });
});
