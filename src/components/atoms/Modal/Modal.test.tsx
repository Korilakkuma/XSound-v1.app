import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import { Props, Modal } from './Modal';

jest.mock('react-dom', () => {
  const original = jest.requireActual('react-dom');

  return {
    ...original,
    createPortal: (node: Node) => node
  };
});

describe('atoms/Modal', () => {
  test('not show', () => {
    const props = { isShow: false } as Props;

    const tree = renderer.create(<Modal {...props}><div>Content</div></Modal>).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('not has overlay', () => {
    const props = {
      isShow    : true,
      hasOverlay: false,
      title     : 'not has overlay',
      onClose   : () => {}
    } as Omit<Props, 'children'>;

    const tree = renderer.create(<Modal {...props}><div>Content</div></Modal>).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('has overlay', () => {
    const props = {
      isShow    : true,
      hasOverlay: true,
      title     : 'has overlay',
      onClose   : () => {}
    } as Omit<Props, 'children'>;

    const tree = renderer.create(<Modal {...props}><div>Content</div></Modal>).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('not close handler', () => {
    const props = {
      isShow    : true,
      hasOverlay: true,
      title     : 'has overlay'
    } as Omit<Props, 'children'>;

    const tree = renderer.create(<Modal {...props}><div>Content</div></Modal>).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('click close button', () => {
    const mockOnClose = jest.fn();

    const props = {
      isShow    : true,
      hasOverlay: true,
      title     : 'has overlay',
      onClose   : mockOnClose
    } as Omit<Props, 'children'>;

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
    } as Omit<Props, 'children'>;

    render(<Modal {...props}><div>Content</div></Modal>);

    fireEvent.click(screen.getAllByRole('button')[0]);

    expect(mockOnClose.mock.calls.length).toBe(1);
  });
});
