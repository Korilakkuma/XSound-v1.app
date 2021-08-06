import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { GroupSelect } from './GroupSelect';

describe('atoms/GroupSelect', () => {
  test('change', () => {
    const mockOnChange = jest.fn();

    const props = {
      id      : 'group-select',
      label   : 'Group Select',
      values  : {
        group0: ['A', 'B', 'C'],
        group1: ['D', 'E', 'F'],
        group2: ['G', 'H', 'I']
      },
      texts   : {
        group0: ['0 - 0', '0 - 1', '0 - 2'],
        group1: ['1 - 0', '1 - 1', '1 - 2'],
        group2: ['2 - 0', '2 - 1', '2 - 2']
      },
      groups  : ['group0', 'group1', 'group2'],
      onChange: mockOnChange
    };

    render(<GroupSelect {...props} />);

    fireEvent.change(screen.getByRole('combobox'));

    expect(mockOnChange).toBeCalledTimes(1);
  });
});
