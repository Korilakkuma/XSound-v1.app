import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('atoms/Button', () => {
  test('inactive', () => {
    const props = {
      active : false,
      label  : 'Start',
      width  : 70,
      height : 33,
      image  : 'https://xsound.app/assets/images/button-audio.png',
      size   : '70px 99px',
      onClick: () => {}
    };

    const tree = renderer.create(<Button {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('active', () => {
    const props = {
      active : true,
      label  : 'Stop',
      width  : 70,
      height : 33,
      image  : 'https://xsound.app/assets/images/button-audio.png',
      size   : '70px 99px',
      onClick: () => {}
    };

    const tree = renderer.create(<Button {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('click', () => {
    const mockOnClick = jest.fn();

    const props = {
      active : false,
      label  : 'Start',
      width  : 70,
      height : 33,
      image  : 'https://xsound.app/assets/images/button-audio.png',
      size   : '70px 99px',
      onClick: mockOnClick
    };

    render(<Button {...props} />);

    fireEvent.click(screen.getByRole('button'));

    expect(mockOnClick.mock.calls.length).toBe(1);
  });
});
