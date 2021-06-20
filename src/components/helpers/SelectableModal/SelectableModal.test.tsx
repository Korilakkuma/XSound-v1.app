import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SelectableModal } from './SelectableModal';

jest.mock('react-dom', () => {
  const original = jest.requireActual('react-dom');

  return {
    ...original,
    createPortal: (node: Node) => node
  };
});

describe('helpers/SelectableModal', () => {
  test('click first', () => {
    const mockOnClick = jest.fn();

    const props = {
      id        : 'modal-click-first',
      isShow    : true,
      hasOverlay: true,
      title     : 'with overlay',
      first     : {
        label : 'first',
        action: mockOnClick
      },
      second    : {
        label : 'second',
        action: () => {}
      },
      onClose   : () => {}
    };

    render(<SelectableModal {...props}><div>Contents</div></SelectableModal>);

    fireEvent.click(screen.getByText('first'));

    expect(mockOnClick.mock.calls.length).toBe(1);
  });

  test('click second', () => {
    const mockOnClick = jest.fn();

    const props = {
      id        : 'modal-click-second',
      isShow    : true,
      hasOverlay: true,
      title     : 'with overlay',
      first     : {
        label : 'first',
        action: () => {}
      },
      second    : {
        label : 'second',
        action: mockOnClick
      },
      onClose   : () => {}
    };

    render(<SelectableModal {...props}><div>Contents</div></SelectableModal>);

    fireEvent.click(screen.getByText('second'));

    expect(mockOnClick.mock.calls.length).toBe(1);
  });
});
