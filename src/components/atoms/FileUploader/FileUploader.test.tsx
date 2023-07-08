import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { FileUploader } from '/src/components/atoms/FileUploader';

describe('atoms/FileUploader', () => {
  test('click', () => {
    const props = {
      accept: 'audio/*',
      disabled: false,
      placeholder: 'MP3, Ogg, WAV ... etc',
      filename: '',
      drag: false,
      drop: true,
      onChange: () => {},
      onDragEnter: () => {},
      onDragOver: () => {},
      onDragLeave: () => {},
      onDrop: () => {}
    };

    const mockOnClick = jest.fn();

    const spy = jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: { click: mockOnClick } });

    render(<FileUploader {...props} />);

    fireEvent.click(screen.getByRole('button'));

    spy.mockRestore();
  });

  test('click (file is `null`)', () => {
    const props = {
      accept: 'audio/*',
      disabled: false,
      placeholder: 'MP3, Ogg, WAV ... etc',
      filename: '',
      drag: false,
      drop: true,
      onChange: () => {},
      onDragEnter: () => {},
      onDragOver: () => {},
      onDragLeave: () => {},
      onDrop: () => {}
    };

    const spy = jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: null });

    render(<FileUploader {...props} />);

    fireEvent.click(screen.getByRole('button'));

    spy.mockRestore();
  });
});
