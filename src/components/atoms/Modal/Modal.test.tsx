import { act, fireEvent, render, screen } from '@testing-library/react';

import { Modal } from '/src/components/atoms/Modal';

jest.mock('react-dom', () => {
  const original = jest.requireActual('react-dom');

  return {
    ...original,
    createPortal: (node: Node) => node
  };
});

jest.useFakeTimers();

describe('atoms/Modal', () => {
  test('click close button', () => {
    const mockOnClose = jest.fn();

    const props = {
      isShow: true,
      hasOverlay: true,
      title: 'has overlay',
      asAlert: false,
      onClose: mockOnClose
    };

    render(
      <Modal {...props}>
        <div>Content</div>
      </Modal>
    );

    fireEvent.click(screen.getAllByRole('button')[1]);

    act(() => {
      jest.advanceTimersByTime(600);
    });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('click overlay', () => {
    const mockOnClose = jest.fn();

    const props = {
      isShow: true,
      hasOverlay: true,
      title: 'has overlay',
      asAlert: false,
      onClose: mockOnClose
    };

    render(
      <Modal {...props}>
        <div>Content</div>
      </Modal>
    );

    fireEvent.click(screen.getAllByRole('button')[0]);

    act(() => {
      jest.advanceTimersByTime(600);
    });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
