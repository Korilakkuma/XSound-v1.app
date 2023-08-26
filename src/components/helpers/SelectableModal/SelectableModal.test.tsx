import { fireEvent, render, screen } from '@testing-library/react';

import { SelectableModal } from '/src/components/helpers/SelectableModal';

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
      isShow: true,
      hasOverlay: true,
      title: 'with overlay',
      first: {
        label: 'first',
        action: mockOnClick
      },
      second: {
        label: 'second',
        action: () => {}
      },
      onClose: () => {}
    };

    render(
      <SelectableModal {...props}>
        <div>Contents</div>
      </SelectableModal>
    );

    fireEvent.click(screen.getByText('first'));

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('click second', () => {
    const mockOnClick = jest.fn();

    const props = {
      isShow: true,
      hasOverlay: true,
      title: 'with overlay',
      first: {
        label: 'first',
        action: () => {}
      },
      second: {
        label: 'second',
        action: mockOnClick
      },
      onClose: () => {}
    };

    render(
      <SelectableModal {...props}>
        <div>Contents</div>
      </SelectableModal>
    );

    fireEvent.click(screen.getByText('second'));

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
