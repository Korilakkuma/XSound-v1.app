import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import { Props, SelectableModal } from './SelectableModal';

describe('helpers/SelectableModal', () => {
  test('render', () => {
    const props = {
      isShow    : true,
      hasOverlay: true,
      title     : 'with overlay',
      first     : {
        label : 'first',
        action: () => {}
      },
      second    : {
        label : 'second',
        action: () => {}
      },
      onClose   : () => {}
    } as Omit<Props, 'children'>;

    const tree = renderer.create(<SelectableModal {...props}><div>Contents</div></SelectableModal>).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('click first', () => {
    const mockOnClick = jest.fn();

    const props = {
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
    } as Omit<Props, 'children'>;

    render(<SelectableModal {...props}><div>Contents</div></SelectableModal>);

    fireEvent.click(screen.getByText('first'));

    expect(mockOnClick.mock.calls.length).toBe(1);
  });

  test('click second', () => {
    const mockOnClick = jest.fn();

    const props = {
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
    } as Omit<Props, 'children'>;

    render(<SelectableModal {...props}><div>Contents</div></SelectableModal>);

    fireEvent.click(screen.getByText('second'));

    expect(mockOnClick.mock.calls.length).toBe(1);
  });
});
