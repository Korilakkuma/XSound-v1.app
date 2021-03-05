import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import { Props, FileUploader } from './FileUploader';

describe('atoms/FileUploader', () => {
  test('no drag, no drop', () => {
    const props = {
      id         : 'uploader-1',
      accept     : 'audio/*',
      placeholder: 'MP3, Ogg, WAV ... etc',
      filename   : '',
      drag       : false,
      drop       : false,
      onChange   : (event: React.SyntheticEvent) => {
        alert(event.type);
      },
      onDragEnter: (event: React.SyntheticEvent) => {
        alert(event.type);
      },
      onDragOver : (event: React.SyntheticEvent) => {
        alert(event.type);
      },
      onDragLeave: (event: React.SyntheticEvent) => {
        alert(event.type);
      },
      onDrop     : (event: React.SyntheticEvent) => {
        alert(event.type);
      }
    } as Props;

    const tree = renderer.create(<FileUploader {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('drag, no drop', () => {
    const props = {
      id         : 'uploader-1',
      accept     : 'audio/*',
      placeholder: 'MP3, Ogg, WAV ... etc',
      filename   : '',
      drag       : true,
      drop       : false,
      onChange   : (event: React.SyntheticEvent) => {
        alert(event.type);
      },
      onDragEnter: (event: React.SyntheticEvent) => {
        alert(event.type);
      },
      onDragOver : (event: React.SyntheticEvent) => {
        alert(event.type);
      },
      onDragLeave: (event: React.SyntheticEvent) => {
        alert(event.type);
      },
      onDrop     : (event: React.SyntheticEvent) => {
        alert(event.type);
      }
    } as Props;

    const tree = renderer.create(<FileUploader {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('drop', () => {
    const props = {
      id         : 'uploader-1',
      accept     : 'audio/*',
      placeholder: 'MP3, Ogg, WAV ... etc',
      filename   : '',
      drag       : false,
      drop       : true,
      onChange   : (event: React.SyntheticEvent) => {
        alert(event.type);
      },
      onDragEnter: (event: React.SyntheticEvent) => {
        alert(event.type);
      },
      onDragOver : (event: React.SyntheticEvent) => {
        alert(event.type);
      },
      onDragLeave: (event: React.SyntheticEvent) => {
        alert(event.type);
      },
      onDrop     : (event: React.SyntheticEvent) => {
        alert(event.type);
      }
    } as Props;

    const tree = renderer.create(<FileUploader {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('click', () => {
    const props = {
      id         : 'uploader-1',
      accept     : 'audio/*',
      placeholder: 'MP3, Ogg, WAV ... etc',
      filename   : '',
      drag       : false,
      drop       : true,
      onChange   : (event: React.SyntheticEvent) => {
        alert(event.type);
      },
      onDragEnter: (event: React.SyntheticEvent) => {
        alert(event.type);
      },
      onDragOver : (event: React.SyntheticEvent) => {
        alert(event.type);
      },
      onDragLeave: (event: React.SyntheticEvent) => {
        alert(event.type);
      },
      onDrop     : (event: React.SyntheticEvent) => {
        alert(event.type);
      }
    } as Props;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const spy = jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: { click: () => {} } });

    render(<FileUploader {...props} />);

    fireEvent.click(screen.getByRole('button'));

    spy.mockRestore();
  });

  test('click (file is `null`)', () => {
    const props = {
      id         : 'uploader-1',
      accept     : 'audio/*',
      placeholder: 'MP3, Ogg, WAV ... etc',
      filename   : '',
      drag       : false,
      drop       : true,
      onChange   : (event: React.SyntheticEvent) => {
        alert(event.type);
      },
      onDragEnter: (event: React.SyntheticEvent) => {
        alert(event.type);
      },
      onDragOver : (event: React.SyntheticEvent) => {
        alert(event.type);
      },
      onDragLeave: (event: React.SyntheticEvent) => {
        alert(event.type);
      },
      onDrop     : (event: React.SyntheticEvent) => {
        alert(event.type);
      }
    } as Props;

    const spy = jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: null });

    render(<FileUploader {...props} />);

    fireEvent.click(screen.getByRole('button'));

    spy.mockRestore();
  });
});
