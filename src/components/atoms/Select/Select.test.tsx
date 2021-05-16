import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import { Select } from './Select';

describe('atoms/Select', () => {
  test('render without width', () => {
    const props = {
      id      : 'select',
      label   : 'Select',
      values  : ['A', 'B', 'C'],
      texts   : ['0 - 0', '0 - 1', '0 - 2'],
      disabled: false,
      onChange: () => {}
    };

    const tree = renderer.create(<Select {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('render with width', () => {
    const props = {
      id      : 'select',
      label   : 'Select',
      values  : ['A', 'B', 'C'],
      texts   : ['0 - 0', '0 - 1', '0 - 2'],
      width   : '50%',
      disabled: false,
      onChange: () => {}
    };

    const tree = renderer.create(<Select {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('change', () => {
    const mockOnChange = jest.fn();

    const props = {
      id      : 'select',
      label   : 'Select',
      values  : ['A', 'B', 'C'],
      texts   : ['0 - 0', '0 - 1', '0 - 2'],
      disabled: false,
      onChange: mockOnChange
    };

    render(<Select {...props} />);

    fireEvent.change(screen.getByRole('combobox'));

    expect(mockOnChange.mock.calls.length).toBe(1);
  });
});
