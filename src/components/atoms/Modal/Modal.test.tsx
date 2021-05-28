import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from './Modal';

jest.mock('react-dom', () => {
  const original = jest.requireActual('react-dom');

  return {
    ...original,
    createPortal: (node: Node) => node
  };
});

describe('atoms/Modal', () => {
  test('click close button', () => {
    const mockOnClose = jest.fn();

    const props = {
      isShow    : true,
      hasOverlay: true,
      title     : 'has overlay',
      onClose   : mockOnClose
    };

    render(<Modal {...props}><div>Content</div></Modal>);

    fireEvent.click(screen.getAllByRole('button')[1]);

    expect(mockOnClose.mock.calls.length).toBe(1);
  });

  test('click overlay', () => {
    const mockOnClose = jest.fn();

    const props = {
      isShow    : true,
      hasOverlay: true,
      title     : 'has overlay',
      onClose   : mockOnClose
    };

    render(<Modal {...props}><div>Content</div></Modal>);

    fireEvent.click(screen.getAllByRole('button')[0]);

    expect(mockOnClose.mock.calls.length).toBe(1);
  });
});
