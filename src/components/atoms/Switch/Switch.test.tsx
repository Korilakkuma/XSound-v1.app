import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import { Props, Switch } from './Switch';

describe('atoms/Switch', () => {
  test('render', () => {
    const props = {
      id      : 'switch',
      label   : 'checked',
      checked : false,
      onChange: () => {}
    } as Props;

    const tree = renderer.create(<Switch {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('change', () => {
    const mockOnChange = jest.fn();

    const props = {
      id      : 'switch',
      label   : 'checked',
      checked : false,
      onChange: mockOnChange
    } as Props;

    render(<Switch {...props} />);

    const checkbox = screen.getByText('checked');

    fireEvent.click(checkbox);

    expect(mockOnChange.mock.calls.length).toBe(1);
    // expect((checkbox as HTMLInputElement).checked).toBe(true);
  });

  test('keyboard access', () => {
    const mockOnChange = jest.fn();

    const props = {
      id      : 'switch',
      label   : 'checked',
      checked : false,
      onChange: mockOnChange
    } as Props;

    const spy = jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: { click: () => {} } });

    render(<Switch {...props} />);

    const checkbox = screen.getByText('checked');

    fireEvent.keyDown(checkbox, { key: 13, code: 'Space' });

    expect(mockOnChange.mock.calls.length).toBe(1);

    spy.mockRestore();
  });

  test('keyboard access (checkbox is `null`)', () => {
    const mockOnChange = jest.fn();

    const props = {
      id      : 'switch',
      label   : 'checked',
      checked : false,
      onChange: mockOnChange
    } as Props;

    const spy = jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: null });

    render(<Switch {...props} />);

    const checkbox = screen.getByText('checked');

    fireEvent.keyDown(checkbox, { key: 13, code: 'Space' });

    expect(mockOnChange.mock.calls.length).toBe(1);

    spy.mockRestore();
  });
});
