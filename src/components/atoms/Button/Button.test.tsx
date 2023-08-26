import { fireEvent, render, screen } from '@testing-library/react';

import { Button } from '/src/components/atoms/Button';

describe('atoms/Button', () => {
  test('click', () => {
    const mockOnClick = jest.fn();

    const props = {
      active: false,
      label: 'Start',
      width: 70,
      height: 33,
      image: 'https://xsound.app/assets/images/button-audio.png',
      size: '70px 99px',
      onClick: mockOnClick
    };

    render(<Button {...props} />);

    fireEvent.click(screen.getByRole('button'));

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
